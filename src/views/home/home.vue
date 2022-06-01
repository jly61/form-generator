<template>
  <div class="container">
    <form-make ref="lyForm" :options="options" />
    <div>
      <el-button @click="validateForm">校验表单</el-button>
      <el-button @click="setForm">修改表单值</el-button>
    </div>
  </div>
</template>

<script>
import formMake from '@/components/formMake/src/formMake'

const sexDict = [
  { label: '男', value: '0' },
  { label: '女', value: '1' },
  { label: '无', value: '2', disabled: true }
]

const cityList = [
  { label: '北京', value: 'beijing' },
  { label: '成都', value: 'chengdu' },
  { label: '上海', value: 'shanghai', disabled: true }
]

const fruits = [
  { label: '橘' },
  { label: '苹果' },
  { label: '梨', disabled: true }
]

const formItems = [
  {
    label: '姓名',
    type: 'input',
    field: 'name',
    required: true,
    props: { maxLength: 100, clearable: true }
  },
  {
    label: '性别',
    type: 'select',
    options: sexDict,
    field: 'sex',
    required: true,
    props: { clearable: true }
  },
  {
    label: '年龄',
    type: 'inputNumber',
    field: 'age',
    props: { clearable: true }
  },
  {
    label: '邮箱',
    type: 'input',
    field: 'email',
    props: {}
  },
  {
    label: '出生日期',
    type: 'datePicker',
    field: 'birth',
    props: { clearable: true, dateType: 'YYYY-MM-DD HH:mm:ss', disabledDate: '2022-05-28' }
  },
  {
    label: '城市',
    type: 'radioGroup',
    field: 'city',
    options: cityList,
    props: {}
  },
  {
    label: '确认入职',
    type: 'checkbox',
    field: 'receive',
    text: '',
    props: {}
  },
  {
    label: '喜欢的水果',
    type: 'checkboxGroup',
    field: 'fruit',
    options: fruits,
    props: {}
  }
]

export default {
  name: 'home',
  components: {
    formMake
  },
  data () {
    // 自定义校验年龄
    const checkAge = (rule, value, callback) => {
      if (!value) {
        callback('年龄不能为空')
      }

      if (!Number.isInteger(value)) {
        callback('年龄必须为整数值')
      }

      if (value < 18) {
        callback('年龄必须满18岁')
      } else {
        callback()
      }
    }

    return {
      options: {
        formOptions: { // el-form配置项
          labelWidth: '130px',
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
            ],
            birth: [
              { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        },
        colOptions: { // el-col配置项
          span: 6
        },
        formData: { // 表单数据
          sex: '',
          name: '',
          age: '',
          email: '',
          birth: '',
          city: '',
          receive: '',
          fruit: []
        },
        formItems // 表单项配置
      }
    }
  },
  methods: {
    validateForm () {
      console.log(this.$refs.lyForm.getForm())
      this.$refs.lyForm.getForm().validate(valid => {
        console.log('valid', valid)
        if (valid) {
          this.$message({
            type: 'success',
            message: '校验成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '校验失败'
          })
        }
      })
    },
    setForm () {
      this.options.formData.name = '和纱'
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    padding: 0 24px;
  }
</style>
