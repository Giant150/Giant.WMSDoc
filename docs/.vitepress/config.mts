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
                collapsed: true,
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
                collapsed: true,
                items: [
                    { text: '功能介绍', link: '/feture' },
                    {
                        text: '基础信息',
                        collapsed: true,
                        items: [
                            { text: '仓库管理', link: '/feture/bas/whse' },
                            { text: '往来单位', link: '/feture/bas/storer' },
                            { text: '区域管理', link: '/feture/bas/area' },
                            { text: '上架区域', link: '/feture/bas/putawayZone' },
                            { text: '库位管理', link: '/feture/bas/loc' },
                            { text: '物料类型', link: '/feture/bas/skuType' },
                            { text: '物料管理', link: '/feture/bas/sku' },
                            { text: '托盘类型', link: '/feture/bas/trayType' },
                            { text: '托盘管理', link: '/feture/bas/tray' },
                            { text: '拣货区域', link: '/feture/bas/pickZone' },
                        ]
                    },
                    {
                        text: '策略设置',
                        collapsed: true,
                        items: [
                            { text: '批次策略', link: '/feture/stg/lot' },
                            { text: '上架策略', link: '/feture/stg/putaway' },
                            { text: '发货策略', link: '/feture/stg/allocate' },
                            { text: '配盘策略', link: '/feture/stg/plate' },
                        ]
                    },
                    {
                        text: '仓库业务',
                        collapsed: true,
                        items: [
                            { text: '到货管理', link: '/feture/bus/asn' },
                            { text: '检验管理', link: '/feture/bus/quality' },
                            { text: '收货管理', link: '/feture/bus/receipt' },
                            { text: '收货明细', link: '/feture/bus/receiptDetail' },
                            { text: '发货管理', link: '/feture/bus/order' },
                            { text: '发货明细', link: '/feture/bus/orderDetail' },
                            { text: '配盘工单', link: '/feture/bus/orderByPlate' },
                            { text: 'SPS工单', link: '/feture/bus/orderBySPS' },
                            { text: '波次管理', link: '/feture/bus/wave' },
                        ]
                    },
                    {
                        text: '库存管理',
                        collapsed: true,
                        items: [
                            { text: '库存查询', link: '/feture/inv/inventory' },
                            { text: '批次信息', link: '/feture/inv/lot' },
                            { text: '库存台账', link: '/feture/inv/ledger' },
                            { text: '库存调整', link: '/feture/inv/adjust' },
                            { text: '库存盘点', link: '/feture/inv/check' },
                            { text: '内部转移', link: '/feture/inv/transfer' },
                            { text: '条码管理', link: '/feture/inv/serial' },
                            { text: '补货管理', link: '/feture/inv/replenal' },
                            { text: '移库管理', link: '/feture/inv/move' },
                            { text: '质检结果', link: '/feture/inv/quality' },
                        ]
                    },
                    {
                        text: '任务设置',
                        collapsed: true,
                        items: [
                            { text: '任务管理', link: '/feture/task/mgt' },
                            { text: '历史任务', link: '/feture/task/his' },
                            { text: '发送报文', link: '/feture/cf/outBox' },
                            { text: '接收报文', link: '/feture/cf/inBox' },
                            { text: '接收报文历史', link: '/feture/cf/inboxHistory' },
                            { text: '发送报文历史', link: '/feture/cf/outboxHistory' },
                        ]
                    },
                    {
                        text: '报表中心',
                        collapsed: true,
                        items: [
                            { text: '物料汇总', link: '/feture/rpt/invSku' },
                            { text: '物料库存汇总', link: '/feture/rpt/invSkuLoc' },
                            { text: '批次属性汇总', link: '/feture/rpt/invLot' },
                            { text: '台账汇总', link: '/feture/rpt/invIn' },
                            { text: '库位监控', link: '/feture/rpt/locRender2D' },
                            { text: '安全库存', link: '/feture/rpt/safetyInv' },
                            { text: 'AGV任务分析', link: '/feture/rpt/taskAnalyse' },
                            { text: 'AGV任务统计', link: '/feture/rpt/taskSummary' },
                            { text: '出入库汇总', link: '/feture/rpt/invInOut' },
                            { text: '期初期末统计', link: '/feture/rpt/oci' },
                            { text: '保养记录报表', link: '/feture/rpt/maintain' },
                            { text: '呆滞记录报表', link: '/feture/rpt/stagnation' },
                            { text: '空托盘统计报表', link: '/feture/rpt/emptyTray' },
                            { text: '指标汇总', link: '/feture/rpt/indicatorSum' },
                            { text: '物料基础数据', link: '/feture/rpt/sku' },
                        ]
                    },
                    {
                        text: '任务设置',
                        collapsed: true,
                        items: [
                            { text: '组织架构', link: '/feture/sys/org' },
                            { text: '用户组织', link: '/feture/sys/user' },
                            { text: '角色管理', link: '/feture/sys/role' },
                            { text: '菜单管理', link: '/feture/sys/menu' },
                            { text: '字典管理', link: '/feture/sys/enum' },
                            { text: '系统参数', link: '/feture/sys/config' },
                            { text: '编码规则', link: '/feture/sys/codeType' },
                            { text: '系统日志', link: '/feture/sys/log' }
                        ]
                    },
                ]
            },
            {
                text: '操作',
                collapsed: true,
                items: [
                    { text: '操作流程', link: '/operate/FlowChart/index' },
                    {
                        text: '操作介绍',
                        collapsed: true,
                        items: [
                            { text: '收货', link: '/operate/recevingGoods/index' },
                            { text: '采购收货', link: '/operate/AsnQcRecipt/index' },
                            { text: '发货', link: '/operate/sendGoods/index' },
                            { text: '拣货至待发区', link: '/operate/PickedToWS/index' },
                            { text: '补货', link: '/operate/replenish/index' },
                            { text: '波次', link: '/operate/wellen/index' },
                            { text: '波次配盘', link: '/operate/wavePlate/index' },
                            { text: '空托操作', link: '/operate/nulltray/index' },
                            { text: '盘点', link: '/operate/check/index' },
                        ]
                    },
                    { text: '常见问题', link: '/operate/QA/index' },
                ]
            },
            {
                text: '部署',
                collapsed: true,
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
                    { text: 'WMS系统打印', link: '/operate/Print/index' },
                    { text: '系统健康检查', link: '/deploy/HealthCheck/index' },
                    { text: '统信UOSV20适配测试报告', link: '/deploy/deployTxUos/index' },
                    { text: '中科方德V50适配测试报告', link: '/deploy/deployZkfdNFS/index' }
                ]
            },
            {
                text: '开发',
                collapsed: true,
                items: [
                    { text: '系统开发', link: '/develop' },
                    { text: '常见问题', link: '/develop/QA/' },
                    { text: '新项目初始化', link: '/develop/projectStart' },
                    { text: '数据库迁移', link: '/develop/updateDatabase' },
                ]
            },
            {
                text: '接口',
                collapsed: true,
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
