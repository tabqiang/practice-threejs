<template>
  <div style="margin-top: 64px">
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      style="width: 100%"
      mode="inline"
      theme="dark"
    >
      <a-menu-item
        v-for="item in menuData"
        :key="item.url"
        @click="toPage(item.url)"
      >
        <template #icon>
          <component :is="item.icon"></component>
        </template>
        {{ item.label }}
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup>
import { reactive, shallowRef } from 'vue'
import {
  DashboardOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
const state = reactive({
  mode: 'inline',
  selectedKeys: ['/dashboard']
})
const menuData = shallowRef([
  {
    label: 'HOME',
    url: '/dashboard',
    icon: DashboardOutlined
  },
  {
    label: 'DEMO01',
    url: '/demo01',
    icon: CalendarOutlined
  },
  {
    label: 'DEMO02',
    url: '/demo02',
    icon: AppstoreOutlined
  },
  {
    label: 'CLIP',
    url: '/clip',
    icon: AppstoreOutlined
  }
])
const router = useRouter()
console.log(router)
const toPage = url => {
  router.push(url)
}
</script>
