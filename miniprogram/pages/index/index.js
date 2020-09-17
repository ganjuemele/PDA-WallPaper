const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    picList: [],
    picUrl: '',
    canDl: true,
    picBgc: '',
    loadText: '图片加载中',
    dlText: '图片下载中'
  },

  onLoad: function(e) {
    // console.log(e.detail)
    let that = this;
    db.collection("wp").get({
      success: function(res) {
        app.globalData.db = res;
        that.data.picList = [...res.data]
        that.data.picList.forEach(item => {
        // console.log(item)
        })
        that.setData({
          picList: that.data.picList,
        })
      }
    })
    // console.log(this.data)
  },
  onReady: function () {
    this.toast = this.selectComponent("#toast");
  },
  listenerLoading(e) {
    this.toast.showToast(e);
  },
  onPicPreview(e) {
    let that = this;
    let picUrl = e.currentTarget.dataset.picurl;

    that.listenerLoading(that.data.loadText);

    setTimeout( () => {
      wx.previewImage({
        current: picUrl,
        urls: [picUrl] // 需要预览的图片http链接列表
      })
    },2000)

  },

  onShareAppMessage(e) {
    let picURL = e.target.dataset.picurl;
    return {
      title: '来! 收下这张好看的壁纸',
      imageUrl: picURL,
      path: '/pages/index/index'
    }
  },

  onPicDl(e) {
    let picUrl = e.target.dataset.picurl;
    let that = this;
    let canDl = that.data.canDl;
    if (canDl) {
      that.listenerLoading(that.data.dlText);

      //判断用户是否授权"保存到相册"
      wx.getSetting({
        success(res) {
          //没有权限，发起授权
          // console.log('发起授权请求')
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success() { //用户允许授权，保存图片到相册
                // console.log('同意授权')
                that.setData({
                  picUrl: picUrl,
                  canDl: false
                })
                that.savePhoto();
              },
              fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
                // console.log('拒绝授权')
                wx.openSetting({
                  success() {
                    wx.authorize({
                      scope: 'scope.writePhotosAlbum',
                      success() {
                        that.setData({
                          picUrl: picUrl,
                          canDl: false
                        })
                        that.savePhoto();
                      }
                    })
                  }
                })
              }
            })
          } else { //用户已授权，保存到相册
            that.setData({
              picUrl: picUrl,
              canDl: false
            })
            // console.log('已授权')
            that.savePhoto()
          }
        }
      })
    }

  },

  //保存图片到相册，提示保存成功
  savePhoto() {
    let that = this;
    wx.downloadFile({
      url: that.data.picUrl,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存至相册',
              icon: "success",
              duration: 1200
            })
          }
        })
      }
    })
    setTimeout(() => {
      that.setData({
        canDl: true
      })
    }, 3000)
  }

})