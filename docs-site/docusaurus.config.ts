import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ArqonDB',
  tagline: 'The Memory Database for AI Agents',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://arqondb.com',
  baseUrl: '/docs/',

  organizationName: 'AlbericByte',
  projectName: 'ArqonDB',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/AlbericByte/ArqonWeb/tree/main/docs-site/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'ArqonDB',
      logo: {
        alt: 'ArqonDB',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://arqondb.com',
          label: 'Home',
          position: 'left',
        },
        {
          href: 'https://github.com/AlbericByte/ArqonDB',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Getting Started', to: '/getting-started/installation' },
            { label: 'Core Concepts', to: '/concepts/causal-graph' },
            { label: 'API Reference', to: '/api/agent-state-service' },
          ],
        },
        {
          title: 'SDKs',
          items: [
            { label: 'Python', to: '/sdks/python' },
            { label: 'Rust', to: '/sdks/rust' },
            { label: 'Go', to: '/sdks/go' },
            { label: 'Java', to: '/sdks/java' },
            { label: 'C++', to: '/sdks/cpp' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/AlbericByte/ArqonDB' },
            { label: 'Home', href: 'https://arqondb.com' },
          ],
        },
      ],
      copyright: `Apache 2.0 License — ArqonDB`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['rust', 'java', 'toml', 'bash', 'yaml', 'protobuf'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
