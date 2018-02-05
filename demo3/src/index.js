/*
入口js
 */
// 引入js模块
import $ from 'jquery'
import {cube} from "./js/math"
import * as atguigu from './js/atguigu.js'
// 引入json模块
import lessons from './assets/json/lessons.json'
// 引入css模块
import './assets/css/style.css'

console.log(cube(3))  // 27

$(function () {
  debugger
  const $app = $('#app')
  const $ul = $('<ul>')
  $app.append($ul)
  console.log('lessions', lessons)
  lessons.forEach(lesson => {
    $ul.append(`<li>课程名: <span class="lesson-name">${lesson.name}</span>, 时间: ${lesson.days}天</li>`)
  })

  const $button = $('<button>去尚硅谷</button>')
  $button.click(() => {
	if(atguigu.studyConfirm()) {
		atguigu.goAtguigu()
	}
  })
  $app.append($button)
})