export default {
    load() {
        return {
            projectNo: '24CTSIL004',
            projectName: '太重叉车仓储系统项目',
            webHost: '10.88.19.3',
            webHostName: 'CTR-SERVER193',
            wmsDocPort: 8443,
            wmsAPIPort: 8060,
            wmsWebPort: 8061,
            wmsRFPort: 8062,
            wmsDIPort: 8063,
            wmsKanban: 8066,
            lipHost: '10.88.19.3',
            lipAPIPort: 8850,
            lipWebPort: 8851,
            lipDIPort: 8853,
            mcsHost: '10.88.19.2',
            mcsAPIPort: 8350,
            mcsWebPort: 8351,
            mcsDIPort: 8352,
            wms: {
                production: {
                    ip: '10.88.19.3',
                    host: 'CTR-SERVER193',
                    api: 'https://10.88.19.3:8060/Swagger',
                    web: 'https://10.88.19.3:8061',
                    rf: 'https://10.88.19.3:8062',
                    di: 'https://10.88.19.3:8063/Swagger',
                    kanban: 'https://10.88.19.3:8066',
                    doc: 'https://10.88.19.3:8433'
                },
                staging: {
                    ip: '10.88.19.130',
                    host: 'CTR-SERVER130',
                    api: 'http://10.88.19.130:8050/Swagger',
                    web: 'http://10.88.19.130:8051',
                    rf: 'http://10.88.19.130:8052',
                    di: 'http://10.88.19.130:8053/Swagger',
                    kanban: '',
                    doc: ''
                },
                test: {
                    ip: '10.76.99.18',
                    host: 'WIN-T5OS7IUPK9S',
                    api: 'https://10.76.99.18:8060/Swagger',
                    web: 'https://10.76.99.18:8061',
                    rf: 'https://10.76.99.18:8062',
                    di: 'https://10.76.99.18:8063/Swagger',
                    kanban: '',
                    doc: 'https://10.76.99.18'
                }
            },
            lip: {
                staging: {},
                production: {
                    ip: '10.88.19.3',
                    host: 'CTR-SERVER193',
                    api: 'http://10.88.19.3:8850/Swagger',
                    web: 'http://10.88.19.3:8851',
                    di: 'http://10.88.19.3:8853/Swagger',
                }
            },
            mcs: {
                staging: {},
                production: {
                    ip: '10.88.19.2',
                    host: 'CTR-SERVER192',
                    api: 'http://10.88.19.3:8350/Swagger',
                    web: 'http://10.88.19.3:8351',
                    di: 'http://10.88.19.3:8352/Swagger',
                }
            }
        }
    }
}