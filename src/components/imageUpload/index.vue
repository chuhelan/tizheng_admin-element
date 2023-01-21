<template>
  <div>
    <el-upload
      :class="{ isShow: display }"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="handleBeforeUpload"
      :http-request="handleUploadFileRequest"
    >
      <i class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-progress v-if="flag" :percentage="percent" style="width:180px" />
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgURL" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDOkwleWG2jJnDf3PGwMcfU8YklaEWcU7b',
  SecretKey: 'NZXGk4C6nIbhkuwnjTxDOPCl9b8d8eAj'
})
export default {
  name: 'HrsaasIndex',

  data() {
    return {
      fileList: [],
      showDialog: false,
      imgURL: '',
      currentId: ',',
      percent: 0,
      flag: false
    }
  },
  computed: {
    display() {
      return this.fileList.length === 1
    }
  },
  mounted() {},
  methods: {
    handlePreview(file) {
      this.showDialog = true
      this.imgURL = file.url
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => item)
      // console.log(file)
      // console.log(fileList)
    },
    handleBeforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const size = 5 * 1024 * 1024
      if (file.size > size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentId = file.uid
      this.flag = true
      return true
    },
    handleUploadFileRequest(params) {
      if (params.file) {
        cos.putObject({
          Bucket: 'tizheng-1312623601', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
          StorageClass: 'STANDARD',
          onProgress: (progressData) => {
            this.percent = progressData.percent * 100
          }
        }, (err, data) => {
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentId) {
                return { url: 'http://' + data.Location, upload: true }
              }
            })
          }
          setTimeout(() => {
            this.flag = false
            this.percent = 0
          }, 1000)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.isShow {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
