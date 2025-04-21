import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'
import defaultDomainTags from '~/assets/default-domain-tags.json'

export const storageDemo = useWebExtensionStorage('webext-demo', 'Storage Demo')

// 计时器模式：累积计时还是重新计时
// 'accumulate': 累积计时，每次打开页面继续累积时间
// 'reset': 重新计时，每次打开页面重新开始计时
export const timerMode = useWebExtensionStorage('timer-mode', 'accumulate')

// 计时器类型：正计时还是倒计时
// 'countdown': 倒计时
// 'countup': 正计时
export const timerType = useWebExtensionStorage('timer-type', 'countup')

// 倒计时的默认时间（分钟）
export const countdownMinutes = useWebExtensionStorage('countdown-minutes', 1)

// 用户名设置，默认为"NiuMA"
export const username = useWebExtensionStorage('username', 'NiuMa')

// 域名标签配置
// 两个标签：打工和摸鱼，每个标签下有多个域名
export interface DomainTags {
  work: string[] // 打工
  fun: string[] // 摸鱼
}

// 使用从JSON文件导入的默认域名标签配置
export const domainTags = useWebExtensionStorage<DomainTags>('domain-tags', defaultDomainTags as DomainTags)
