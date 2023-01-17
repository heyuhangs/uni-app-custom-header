interface GetSafeAreaInsertInfoRes {
  /**
   * 比例系数
   */
  scaleFactor: number
  /**
   * 当前设备的屏幕高度
   */
  windowHeight: number
  /**
   * 当前设备的屏幕宽度
   */
  windowWidth: number
  /**
   * 状态栏高度
   */
  statusBarHeight: number
  /**
   * 除导航栏内容高度
   */
  windowContentHeight: number
  /**
   * 微信胶囊高度
   */
  menuButtonHeight: number
  /**
   * 微信胶囊宽度
   */
  menuButtonWidth: number
  /**
   * 微信胶囊上边界的坐标
   */
  menuButtonTop: number
  /**
   * 微信胶囊右边界的坐标
   */
  menuButtonRight: number
  /**
   * 微信胶囊下边界的坐标
   */
  menuButtonBottom: number
  /**
   * 微信胶囊左边界的坐标
   */
  menuButtonLeft: number
  /**
   * 头部导航栏总高度
   */
  navHeight: number
}
