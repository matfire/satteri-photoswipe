import probe from "probe-image-size";
import { defineHastPlugin } from "satteri";
import type { Element } from "hast";

const satteriPhotoswipe = defineHastPlugin({
  name: "satteri-photoswipe",
  element: {
    filter: ["img"],
    async visit(node, ctx) {
      const { src } = node.properties;

      if (typeof src !== "string") return;

      const anchorNode: Element = {
        type: "element",
        tagName: "a",
        properties: {
          href: src,
        },
        children: [],
      };

      try {
        const { width, height } = await probe(src);

        anchorNode.properties["data-pswp-width"] = width;
        anchorNode.properties["data-pswp-height"] = height;

        ctx.wrapNode(node, anchorNode);
      } catch (error) {
        console.error(`[SatteriPhotoswipe]: ${error}`);
      }
    },
  },
});

export { satteriPhotoswipe };
export default satteriPhotoswipe;
