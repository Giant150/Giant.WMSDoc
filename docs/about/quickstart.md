<script setup>
import { ref } from 'vue'
import { data } from '/.vitepress/project.data.ts'
const projectData = ref(data)
</script>

# 快速开始

## 安装根证书

安装根证书：[安装说明](/deploy/installCert)

## WMS系统访问

|名称|正式环境|演示环境|测试环境|说明|
|---|---|---|---|---|
|WMS电脑端|<a :href="projectData.wms.production.web" target="_blank">Production</a>|<a :href="projectData.wms.staging.web" target="_blank">Staging</a>|<a :href="projectData.wms.test.web" target="_blank">Test</a>|WMS系统电脑端|
|WMS移动端|<a :href="projectData.wms.production.rf" target="_blank">Production</a>|<a :href="projectData.wms.staging.rf" target="_blank">Staging</a>|<a :href="projectData.wms.test.rf" target="_blank">Test</a>|WMS系统移动端|
|WMS看板|<a :href="projectData.wms.production.kanban" target="_blank">Production</a>|<a :href="projectData.wms.staging.kanban" target="_blank">Staging</a>|<a :href="projectData.wms.test.kanban" target="_blank">Test</a>|WMS系统看板|
|WDI数据集成|<a :href="projectData.wms.production.di" target="_blank">Production</a>|<a :href="projectData.wms.staging.di" target="_blank">Staging</a>|<a :href="projectData.wms.test.di" target="_blank">Test</a>|WMS系统数据集成平台|
|WMS API|<a :href="projectData.wms.production.api" target="_blank">Production</a>|<a :href="projectData.wms.staging.api" target="_blank">Staging</a>|<a :href="projectData.wms.test.api" target="_blank">Test</a>|WMS系统服务接口|


|名称|正式环境|说明|
|---|---|---|
|WMS电脑端|<a :href="'https://'+projectData.webHost+':'+projectData.wmsWebPort" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsWebPort}}</a>|WMS系统电脑端|
|WMS移动端|<a :href="'https://'+projectData.webHost+':'+projectData.wmsRFPort" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsRFPort}}</a>|WMS系统移动端|
|WMS看板|<a :href="'https://'+projectData.webHost+':'+projectData.wmsKanban" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsKanban}}</a>|WMS系统看板|
|WMS API|<a :href="'https://'+projectData.webHost+':'+projectData.wmsAPIPort+'/Swagger'" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsAPIPort}}/Swagger</a>|WMS系统服务接口|
|WDI数据集成|<a :href="'https://'+projectData.webHost+':'+projectData.wmsDIPort+'/Swagger'" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsDIPort}}/Swagger</a>|WMS系统数据集成平台|
|WMS文档|<a :href="'https://'+projectData.webHost+':'+projectData.wmsDocPort" target="_blank">https://{{projectData.webHost}}:{{projectData.wmsDocPort}}</a>|WMS系统文档|

## LIP系统访问

|名称|地址|说明|
|---|---|---|
|LIP Web|<a :href="'http://'+projectData.lipHost+':'+projectData.lipWebPort" target="_blank">http://{{projectData.lipHost}}:{{projectData.lipWebPort}}</a>|LIP电脑端|
|LIP API|<a :href="'http://'+projectData.lipHost+':'+projectData.lipAPIPort+'/Swagger'" target="_blank">http://{{projectData.lipHost}}:{{projectData.lipAPIPort}}/Swagger</a>|LIP服务接口|
|LIP DI|<a :href="'http://'+projectData.lipHost+':'+projectData.lipDIPort+'/Swagger'" target="_blank">http://{{projectData.lipHost}}:{{projectData.lipDIPort}}/Swagger</a>|LIP数据集成接口|

## MCS系统访问

|名称|地址|说明|
|---|---|---|
|MCS Web|<a :href="'http://'+projectData.mcsHost+':'+projectData.mcsWebPort" target="_blank">http://{{projectData.mcsHost}}:{{projectData.mcsWebPort}}</a>|MCS电脑端|
|MCS API|<a :href="'http://'+projectData.mcsHost+':'+projectData.mcsAPIPort+'/Swagger'" target="_blank">http://{{projectData.mcsHost}}:{{projectData.mcsAPIPort}}/Swagger</a>|MCS服务接口|
|MCS DI|<a :href="'http://'+projectData.mcsHost+':'+projectData.mcsDIPort+'/Swagger'" target="_blank">http://{{projectData.mcsHost}}:{{projectData.mcsDIPort}}/Swagger</a>|MCS数据集成接口|