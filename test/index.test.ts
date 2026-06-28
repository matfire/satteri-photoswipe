import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { markdownToHtml } from "satteri";
import type { HastVisitorContext } from "satteri";
import satteriPhotoswipe from "../src/index.js";

const imageUrl = "https://images.test/photo.svg";
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"></svg>';

const server = setupServer(
  http.get(imageUrl, () => {
    return HttpResponse.text(svg, {
      headers: {
        "content-type": "image/svg+xml",
      },
    });
  }),
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});

describe("satteriPhotoswipe", () => {
  test("wraps a probed image with PhotoSwipe dimensions", async () => {
    const { html } = await markdownToHtml(`![Alt text](${imageUrl})`, {
      hastPlugins: [satteriPhotoswipe],
    });

    expect(html).toContain("<a ");
    expect(html).toContain(`href="${imageUrl}"`);
    expect(html).toContain('data-pswp-width="640"');
    expect(html).toContain('data-pswp-height="480"');
    expect(html).toContain(`<img src="${imageUrl}" alt="Alt text">`);
  });

  test("leaves an image unchanged when probing fails", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    server.use(
      http.get(imageUrl, () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    const { html } = await markdownToHtml(`![Alt text](${imageUrl})`, {
      hastPlugins: [satteriPhotoswipe],
    });

    expect(html).not.toContain("<a ");
    expect(html).toContain(`<img src="${imageUrl}" alt="Alt text">`);
    expect(error).toHaveBeenCalledWith(expect.stringContaining("[SatteriPhotoswipe]:"));
  });

  test("ignores image elements with a missing src", async () => {
    const visitor = Array.isArray(satteriPhotoswipe.element)
      ? satteriPhotoswipe.element[0]
      : satteriPhotoswipe.element;
    const wrapNode = vi.fn<() => void>();

    await visitor?.visit(
      {
        type: "element",
        tagName: "img",
        properties: {},
        children: [],
      },
      { wrapNode } as unknown as HastVisitorContext,
    );

    expect(wrapNode).not.toHaveBeenCalled();
  });
});
