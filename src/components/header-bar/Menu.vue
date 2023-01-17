<template>
  <view class="menu">
    <view v-for="(item, index) in list" :key="index" class="menu__item" @click="toPage(item)">
      <image class="menu__img" :src="item.icon" />
      <text class="menu__text">{{ item.title }}</text>
      <text v-if="item.unread" class="menu__count">{{ item.unread }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  unread: Number
}>()

const emits = defineEmits()

uni.setStorageSync('visitorSign', true)

const imageServerURl = `https://img09.zhaopin.com/2012/other/mobile/mapp/mp-b`

const list = computed(() => {
  return [
    {
      title: '首页',
      trackName: 'msg',
      icon: `${imageServerURl}/header-menu-message.png`,
      url: '/pages/index/index'
    },

    {
      title: '购物车',
      trackName: 'cv_share',
      icon: `${imageServerURl}/header-menu-forwarding.png`,
      url: '/pages/detail/detail',
      unread: props.unread > 99 ? '99+' : props.unread
    },
    {
      title: '商品分类',
      trackName: 'recommend',
      icon: `${imageServerURl}/header-menu-mine.png`,
      url: '/pages/detail/detail'
    },
    {
      title: '我的账户',
      trackName: 'talent_manage',
      icon: `${imageServerURl}/header-menu-communicate.png`,
      url: '/pages/mine/mine'
    },
    {
      title: '订单列表',
      trackName: 'interview_manage',
      icon: `${imageServerURl}/header-menu-interview.png`,
      url: '/pages/detail/detail'
    }
  ]
})

const toPage = (row: any) => {
  // emits
}
</script>

<style lang="scss">
.menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // align-items: center;
  flex-wrap: wrap;
  position: relative;
  width: 260rpx;
  height: 420rpx;
  background: #fff;
  border-radius: 18rpx;
  box-shadow: 0 8rpx 32rpx 0 rgba(34, 34, 34, 0.15);
  padding: 12rpx 0 6rpx 35rpx;

  ::before {
    content: '';
    width: 0;
    height: 0;
    box-shadow: 15rpx rgba(34, 34, 34, 0.15);
    border-left: 28rpx solid transparent;
    border-right: 28rpx solid transparent;
    border-bottom: 28rpx solid #fff;
    position: absolute;
    top: -18rpx;
    left: 46rpx;
  }

  &__item {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 80rpx;
  }

  &__text {
    font-size: 28rpx;
    font-weight: 400;
    color: #222;
    height: 80rpx;
    line-height: 80rpx;
    // width: 125rpx;
    max-width: 125rpx;
  }

  &__img {
    width: 42rpx;
    height: 42rpx;
    margin-right: 8rpx;
  }

  &__count {
    padding: 0 8rpx;
    margin-left: 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    min-width: 20rpx;
    text-align: center;
    background-color: #f03a2d;
    border-radius: 17rpx;
    font-size: 22rpx;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
