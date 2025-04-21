<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { domainTags, username } from '~/logic/storage'

// 定义URL数据的类型
interface UrlData {
  domain: string
  url?: string
  seconds: number
}

// 排行榜数据
const todayRanking = ref<UrlData[]>([])
const isLoading = ref(true)
const error = ref('')

// 工作和娱乐时间统计
const workMinutes = ref(0)
const funMinutes = ref(0)

// 格式化简单分钟显示
function formatMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  return `${minutes} 分钟`
}

// 获取今日的日期和格式化显示
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const formattedDate = computed(() => {
  const date = new Date()
  return `今日 ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
})

// 检查域名是否属于特定标签
function isDomainInTag(domain: string, tagType: 'work' | 'fun'): boolean {
  return domainTags.value[tagType].some(tagDomain => domain.includes(tagDomain))
}

// 获取排行榜数据
async function fetchTodayRanking() {
  isLoading.value = true
  error.value = ''

  try {
    // 从存储中获取今日数据
    const result = await browser.storage.local.get(today.value)
    const todayData = result[today.value] || {} as Record<string, number | string>

    // 转换为数组并排序
    const ranking: UrlData[] = []

    // 重置计时器
    workMinutes.value = 0
    funMinutes.value = 0

    // 遍历所有键，找出所有域名数据（非detail:开头的键为域名）
    for (const key in todayData) {
      if (!key.startsWith('detail:') && typeof todayData[key] === 'number') {
        const domain = key
        const seconds = todayData[key] as number
        const detailKey = `detail:${domain}`
        const url = todayData[detailKey] as string || domain // 如果没有详细URL，就用域名

        ranking.push({ domain, url, seconds })

        // 根据域名标签计算工作和摸鱼时间
        if (isDomainInTag(domain, 'work')) {
          workMinutes.value += seconds / 60
        }
        else if (isDomainInTag(domain, 'fun')) {
          funMinutes.value += seconds / 60
        }
      }
    }

    // 按时间排序
    ranking.sort((a, b) => b.seconds - a.seconds)

    todayRanking.value = ranking
  }
  catch (e) {
    error.value = '获取数据失败'
    console.error('获取排行榜数据失败:', e)
  }
  finally {
    isLoading.value = false
  }
}

// 打开选项页
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

// 刷新数据
function refreshData() {
  fetchTodayRanking()
}

// 组件挂载时获取数据
onMounted(() => {
  fetchTodayRanking()
})
</script>

<template>
  <main class="w-full px-4 py-5 text-gray-700 bg-white">
    <!-- 头部区域 -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold bg-gradient-to-r from-orange-600 to-orange-300 text-transparent bg-clip-text">
        嗨，{{ username }}
      </h1>
      <div class="text-sm text-gray-500">
        {{ formattedDate }}
      </div>
    </div>

    <!-- 数据统计卡片 -->
    <div class="bg-orange-100 bg-opacity-20 border border-orange-300 rounded-lg p-4 mb-6">
      <div class="flex justify-between">
        <!-- 摸鱼时间 -->
        <div class="flex flex-col">
          <span class="text-xs text-gray-500 mb-1">摸鱼赚钱 😊</span>
          <div class="flex items-end">
            <span class="text-xl font-medium text-orange-700">{{ Math.floor(funMinutes) }}</span>
            <span class="text-xs text-gray-400 ml-1">分钟</span>
          </div>
        </div>

        <!-- 工作时间 -->
        <div class="flex flex-col">
          <span class="text-xs text-gray-500 mb-1">认真打工 😭</span>
          <div class="flex items-end">
            <span class="text-xl font-medium text-orange-400">{{ Math.floor(workMinutes) }}</span>
            <span class="text-xs text-gray-400 ml-1">分钟</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="flex justify-center py-6">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500" />
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-600">
      {{ error }}
    </div>

    <!-- 没有记录状态 -->
    <div v-else-if="todayRanking.length === 0" class="py-8 text-center text-gray-500">
      今天还没有浏览记录
    </div>

    <!-- 排行榜列表 -->
    <ul v-else class="space-y-3 mb-6">
      <li
        v-for="(item, index) in todayRanking"
        :key="index"
        class="bg-white rounded-lg shadow p-3 flex items-center justify-between"
      >
        <div class="flex items-center">
          <div class="flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-300 text-white rounded-full w-6 h-6 text-xs mr-3 flex-shrink-0">
            {{ index + 1 }}
          </div>
          <div class="font-medium" :title="item.domain">
            {{ item.domain }}
          </div>
        </div>
        <div class="text-orange-600 font-medium">
          {{ formatMinutes(item.seconds) }}
        </div>
      </li>
    </ul>

    <!-- 底部按钮区域 -->
    <div class="fixed bottom-5 right-4 flex space-x-3">
      <!-- 设置按钮 -->
      <button
        class="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
        title="设置"
        @click="openOptionsPage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        </svg>
      </button>

      <!-- 刷新按钮 -->
      <button
        class="w-10 h-10 flex items-center justify-center bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
        title="刷新数据"
        @click="refreshData"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </main>
</template>
