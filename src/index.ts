import { HtmlTags, LoadContext, Plugin } from '@docusaurus/types';

export default function umamiTagAnalytics({
  siteConfig: { themeConfig },
}: LoadContext): Plugin<void> {
  const { umamitag }: any = themeConfig || {}; // global

  const websiteId = umamitag?.websiteId;
  const src = umamitag?.src;

  if (!umamitag) {
    throw new Error(
      'You need to specify `umamitag` object in `themeConfig` ' +
        'with `code` field in it to use docusaurus-plugin-umamitag'
    );
  }
  if (!src) {
    throw new Error(
      'You specified the `umamitag` object in `themeConfig`, ' +
        'but the `code` field was missing. '
    );
  }

  if (!websiteId) {
    throw new Error(
      'You specified the `umamitag` object in `themeConfig` but the `websiteId` field was missing. ' +
        'Please add it.'
    );
  }
  if (typeof websiteId !== 'string') {
    throw new Error(
      'You specified the `umamitag` object in `themeConfig` but the `code` field should be a string.'
    );
  }

  const isProd = process.env.NODE_ENV === 'production';

  const analyticsDomain = `https://${src}/umami.js`;

  const injectUmamiTag = (): { headTags: HtmlTags } => {
    return {
      headTags: [
        {
          tagName: 'script',
          attributes: {
            src: analyticsDomain,
            'data-website-id': websiteId,
          },
        },
      ],
    };
  };
  return {
    name: 'docusaurus-plugin-umami',
    injectHtmlTags: isProd ? injectUmamiTag : undefined,
  };
}
