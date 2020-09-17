var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {

  },


  methods: {
    
    onPicPreview (e) {
      wx.previewImage({
        current: 'cloud://wp-5moue.7770-wp-5moue-1302009781/wallpaper/pic1@2x.png', // 当前显示图片的http链接
        urls: [`cloud://wp-5moue.7770-wp-5moue-1302009781/wallpaper/pic1@2x.png`] // 需要预览的图片http链接列表
        // current: 'https://7770-wp-5moue-1302009781.tcb.qcloud.la/wallpaper/pic%402x.png', // 当前显示图片的http链接
        // urls: [`https://7770-wp-5moue-1302009781.tcb.qcloud.la/wallpaper/pic%402x.png`] // 需要预览的图片http链接列表
      })
    },
    
    onPicDl () {
      wx.saveImageToPhotosAlbum({
        filePath: '../../images/pic1@2x.png',
        success(res) { console.log('成功')}
      })
    //   wx.downloadFile({
    //     url: 'https://7770-wp-5moue-1302009781.tcb.qcloud.la/wallpaper/pic%402x.png',
    //     success: function(res) {
    //       if (res.statusCode === 200) {
    //         let img = res.tempFilePath;
    //   wx.getImageInfo({
    //     src: 'https://7770-wp-5moue-1302009781.tcb.qcloud.la/wallpaper/pic%402x.png?sign=7649f1137efff8ecb6f60fb5c069d714&t=1588478849',
    //     success: function (res) {
    //       console.log(res.path)
    //       wx.getSetting({
    //         success(res) {
    //           if (!res.authSetting['scope.writePhotosAlbum']) {
    //             wx.authorize({
    //               scope: 'scope.writePhotosAlbum',
    //               success() {
    //                 wx.saveImageToPhotosAlbum({
    //                   filePath: res.path,
    //                   success(result) {
    //                     console.log(result)
    //                   }
    //                 })
    //               }
    //             })
    //           }
    //         }
    //       })
    //     }
    //   })
    //       }
    //     }
    //   })
    }

  }
})
