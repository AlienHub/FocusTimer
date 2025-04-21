<script setup lang="ts">
import { ref } from 'vue'
import { countdownMinutes, domainTags, timerMode, timerType, username } from '~/logic/storage'

// 新增域名的临时存储
const newWorkDomain = ref('')
const newFunDomain = ref('')

// 添加新的工作域名
function addWorkDomain() {
  if (!newWorkDomain.value)
    return
  if (!domainTags.value.work.includes(newWorkDomain.value)) {
    domainTags.value.work.push(newWorkDomain.value)
  }
  newWorkDomain.value = ''
}

// 添加新的娱乐域名
function addFunDomain() {
  if (!newFunDomain.value)
    return
  if (!domainTags.value.fun.includes(newFunDomain.value)) {
    domainTags.value.fun.push(newFunDomain.value)
  }
  newFunDomain.value = ''
}

// 移除工作域名
function removeWorkDomain(domain: string) {
  domainTags.value.work = domainTags.value.work.filter(d => d !== domain)
}

// 移除娱乐域名
function removeFunDomain(domain: string) {
  domainTags.value.fun = domainTags.value.fun.filter(d => d !== domain)
}
</script>

<template>
  <main class="px-4 py-10 text-gray-700 max-w-3xl mx-auto">
    <div class="text-center mb-8">
      <div class="text-2xl font-bold mb-2">
        专注计时器设置
      </div>
      <div class="text-sm text-gray-500">
        自定义您的计时器行为
      </div>
    </div>

    <!-- 用户信息设置 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">
        个人信息
      </h2>

      <div class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <div class="flex">
            <input
              id="username"
              v-model="username"
              type="text"
              class="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="请输入您的用户名"
            >
          </div>
          <p class="mt-1 text-sm text-gray-500">
            您的用户名将显示在侧边栏欢迎语中（自动保存）
          </p>
        </div>
      </div>
    </div>

    <!-- 域名标签配置 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">
        域名标签配置
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 工作域名 -->
        <div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <h3 class="text-base font-medium">
              打工域名
            </h3>
          </div>

          <div class="mt-3">
            <div class="flex mb-2">
              <input
                v-model="newWorkDomain"
                type="text"
                class="flex-1 border border-gray-300 rounded-l-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="输入工作相关域名"
                @keyup.enter="addWorkDomain"
              >
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="addWorkDomain"
              >
                添加
              </button>
            </div>

            <ul class="mt-2 space-y-1 max-h-40 overflow-y-auto">
              <li
                v-for="domain in domainTags.work"
                :key="domain"
                class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
              >
                <span class="text-sm text-gray-700">{{ domain }}</span>
                <button
                  class="text-red-500 hover:text-red-700"
                  @click="removeWorkDomain(domain)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            </ul>

            <p class="mt-2 text-xs text-gray-500">
              这些域名会被归类为"打工"，用于时间统计
            </p>
          </div>
        </div>

        <!-- 摸鱼域名 -->
        <div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.24 7.24a1 1 0 011.41 1.41l-5.66 5.66a1 1 0 01-1.41 0l-2.83-2.83a1 1 0 011.41-1.41l2.12 2.12 4.96-4.95z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-base font-medium">
              摸鱼域名
            </h3>
          </div>

          <div class="mt-3">
            <div class="flex mb-2">
              <input
                v-model="newFunDomain"
                type="text"
                class="flex-1 border border-gray-300 rounded-l-md shadow-sm px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="输入娱乐相关域名"
                @keyup.enter="addFunDomain"
              >
              <button
                class="px-4 py-2 bg-orange-600 text-white rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                @click="addFunDomain"
              >
                添加
              </button>
            </div>

            <ul class="mt-2 space-y-1 max-h-40 overflow-y-auto">
              <li
                v-for="domain in domainTags.fun"
                :key="domain"
                class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
              >
                <span class="text-sm text-gray-700">{{ domain }}</span>
                <button
                  class="text-red-500 hover:text-red-700"
                  @click="removeFunDomain(domain)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            </ul>

            <p class="mt-2 text-xs text-gray-500">
              这些域名会被归类为"摸鱼"，用于时间统计
            </p>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
        注意：域名标签用于计算每日工作和摸鱼的时间比例，未标记的域名不会计入任何类别
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">
        计时模式
      </h2>

      <div class="space-y-4">
        <label class="flex items-start">
          <div class="flex items-center h-6">
            <input
              v-model="timerMode"
              type="radio"
              value="accumulate"
              class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium">累积计时</div>
            <div class="text-sm text-gray-500">在同一个网页每次访问时继续累加时间，总是显示在此页面的累计停留时间</div>
          </div>
        </label>

        <label class="flex items-start">
          <div class="flex items-center h-6">
            <input
              v-model="timerMode"
              type="radio"
              value="reset"
              class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium">重新计时</div>
            <div class="text-sm text-gray-500">每次打开页面时重新计时，只显示当前会话的停留时间</div>
          </div>
        </label>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
        注意：修改计时模式会立即影响所有已打开页面的计时器行为
      </div>
    </div>

    <!-- 计时器类型设置 -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-lg font-medium mb-4">
        计时器类型
      </h2>

      <div class="space-y-4">
        <label class="flex items-start">
          <div class="flex items-center h-6">
            <input
              v-model="timerType"
              type="radio"
              value="countup"
              class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium">正计时</div>
            <div class="text-sm text-gray-500">从零开始计时，记录您在页面上停留的时间</div>
          </div>
        </label>

        <label class="flex items-start">
          <div class="flex items-center h-6">
            <input
              v-model="timerType"
              type="radio"
              value="countdown"
              class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            >
          </div>
          <div class="ml-3">
            <div class="text-base font-medium">倒计时</div>
            <div class="text-sm text-gray-500">设定一个专注时间，帮助您集中精力完成任务</div>
          </div>
        </label>

        <!-- 倒计时设置 -->
        <div v-if="timerType === 'countdown'" class="ml-7 mt-2 p-4 bg-gray-50 rounded-md">
          <label class="block text-sm font-medium text-gray-700 mb-2">专注时长（分钟）</label>
          <div class="flex items-center space-x-3">
            <button
              class="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
              @click="countdownMinutes > 5 ? countdownMinutes-- : null"
            >
              -
            </button>
            <input
              v-model="countdownMinutes"
              type="number"
              min="1"
              max="120"
              class="w-16 text-center border border-gray-300 rounded-md shadow-sm px-2 py-1 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
            <button
              class="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-500 hover:bg-gray-100"
              @click="countdownMinutes < 120 ? countdownMinutes++ : null"
            >
              +
            </button>
          </div>
          <div class="mt-2 text-xs text-gray-500">
            推荐设置：25分钟（番茄工作法）、45分钟（专注工作段）
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
        您可以随时在浏览器右侧的计时器上切换计时器类型
      </div>
    </div>

    <div class="bg-orange-50 p-4 rounded-lg text-sm text-orange-700">
      <div class="font-medium mb-1">
        提示
      </div>
      <div>无论选择哪种计时模式，侧面板中的统计数据始终会累计记录您在每个网站的总停留时间。</div>
    </div>

    <div class="mt-8 text-center text-sm text-gray-500">
      专注计时器 - 帮助您了解时间去向
    </div>
  </main>
</template>

<style>
body {
  background-color: #f9fafb;
}
</style>
