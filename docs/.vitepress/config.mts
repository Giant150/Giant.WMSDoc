import { defineConfig } from 'vitepress'
import data from './project.data.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZEQP WMS",
  description: "ZEQP WMS DOCUMENT",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/about' },
      { text: '功能', link: '/feture' },
      { text: '操作', link: '/operate' },
      { text: '部署', link: '/deploy' },
      { text: '开发', link: '/develop' },
      { text: '接口', link: '/api' },
    ],

    sidebar: [
      {
        text: '简介',
        items: [
          { text: 'ZEQPWMS', link: '/about' },
          { text: '快速开始', link: '/about/quickstart' },
          { text: '区域规则', link: `/custom/area/${data.load().projectNo}/` },
          { text: '库位规则', link: `/custom/loc/${data.load().projectNo}/` },
          { text: '业务流程', link: `/custom/business/${data.load().projectNo}/` },
        ]
      },
      {
        text: '功能',
        items: [
          { text: '功能介绍', link: '/feture' },
          {
            text: '基础信息',
            items: [
              { text: '库位信息', link: '/feture/bas/loc' },
              { text: '物料信息', link: '/feture/bas/sku' },
              { text: '拣货区域', link: '/feture/bas/pickZone' },
            ]
          },
          {
            text: '策略设置',
            items: [
              { text: '批次策略', link: '/feture/stg/lot' },
              { text: '上架策略', link: '/feture/stg/putaway' },
              { text: '发货策略', link: '/feture/stg/allocate' },
              { text: '配盘策略', link: '/feture/stg/plate' },
            ]
          },
          {
            text: '库存管理',
            items: [
              { text: '内部转移', link: '/feture/inv/transfer' },
            ]
          },
        ]
      },
      {
        text: '操作',
        items: [
          {
            text: '操作介绍',
            items: [
              { text: '收货', link: '/operate/recevingGoods/index' },
              { text: '发货', link: '/operate/sendGoods/index' },
              { text: '补货', link: '/operate/replenish/index' },
              { text: '波次', link: '/operate/wellen/index' },
              { text: '空托操作', link: '/operate/nulltray/index' },
            ]
          },
          { text: '常见问题', link: '/operate/QA/index' },
        ]
      },
      {
        text: '部署',
        items: [
          { text: '系统部署', link: '/deploy' },
          { text: 'WindowsServer配置', link: '/deploy/init-winserver' },
          { text: 'SQLServer安装', link: '/deploy/InstallSqlServer' },
          { text: '部署WMS API', link: '/deploy/deployWMSAPI' },
          { text: '部署WMS Web', link: '/deploy/deployWMSWeb' },
          { text: '部署WMS RF', link: '/deploy/deployWMSRF' },
          { text: '部署WMS DI', link: '/deploy/deployWMSDI' },
          { text: '根证书安装', link: '/deploy/installCert' },
          { text: 'PDA初始化', link: '/deploy/init-PDA' },
          { text: 'WMS系统打印', link: '/operate/Print/index' }
        ]
      },
      {
        text: '开发',
        items: [
          { text: '系统开发', link: '/develop' },
          { text: '常见问题', link: '/develop/QA/' },
          { text: '新项目初始化', link: '/develop/projectStart' },
          { text: '数据库迁移', link: '/develop/updateDatabase' },
        ]
      },
      {
        text: '接口',
        items: [
          { text: '标准接口', link: '/api' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  ignoreDeadLinks: true
})
