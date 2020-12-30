import request from '@utils/request'

/**
 * @module 算法研发
 */

/**
 * @module 推理任务
 */
// 获取任务列表
export function getInferenceList (data) {
  return request({
    url: '/astrology/ai-task-inference/list',
    data,
    method: 'POST'
  })
}

// 取消任务
export function cancelInference (data) {
  return request({
    url: '/astrology/ai-task-inference/cancel',
    data,
    method: 'POST'
  })
}

// 重新执行任务
export function restartInference (data) {
  return request({
    url: '/astrology/ai-task-inference/restart',
    data,
    method: 'POST'
  })
}

// 获取运行结果
export function getInferenceResults (data) {
  return request({
    url: '/astrology/ai-task-inference/results',
    data,
    method: 'POST'
  })
}

// 获取运行结果
export function addTaskInference (data) {
  return request({
    url: '/astrology/ai-task-inference/add-task-inference',
    data,
    method: 'POST'
  })
}

/** @module 算法学习 */
export function getLearnList (data) {
  return request({
    url: '/astrology/ai-task-learning/list',
    data,
    method: 'POST'
  })
}

export function cancelTaskLearn (data) {
  return request({
    url: '/astrology/ai-task-learning/cancel',
    data,
    method: 'POST'
  })
}

export function restartLearning (data) {
  return request({
    url: '/astrology/ai-task-learning/restart',
    data,
    method: 'POST'
  })
}

export function getLearnResult (data) {
  return request({
    url: '/astrology/ai-task-learning/results',
    data,
    method: 'POST'
  })
}

//
export function addLearning (data) {
  return request({
    url: '/astrology/ai-task-learning/add-task-learning',
    data,
    method: 'POST'
  })
}
