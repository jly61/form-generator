<template>
  <div class="container">
    <form-make ref="lyForm" :options="options" />
    <el-col :span="6" style="text-align: center">
      <el-button @click="validateForm">校验表单</el-button>
      <el-button @click="setForm">修改表单值</el-button>
    </el-col>
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

const cascaderData = [
  {
    value: 'fe',
    label: '前端',
    children: [
      {
        value: 'vue',
        label: 'Vue'
      },
      {
        value: 'react',
        label: 'React'
      },
      {
        value: 'jquery',
        label: 'Jquery',
        disabled: true
      }
    ]
  },
  {
    value: 'ee',
    label: '后端',
    children: [
      {
        value: 'go',
        label: 'Go'
      },
      {
        value: 'php',
        label: 'PHP'
      },
      {
        value: 'java',
        label: 'Java'
      }
    ]
  }
]

const formItems = [
  {
    label: '姓名',
    type: 'input',
    field: 'name',
    required: true,
    events: {
      blur: function (e) {
        console.log('event', e)
        console.log('this', this.options)
      }
    },
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
  },
  {
    label: '技术',
    type: 'cascader',
    field: 'tech',
    required: true,
    options: cascaderData,
    props: {}
  },
  {
    label: '付费方式',
    type: 'switch',
    field: 'pay',
    props: {
      activeColor: '#13ce66',
      inactiveColor: '#ff4949',
      activeText: '按月付费',
      inactiveText: '按年付费'
    }
  },
  {
    label: '价格区间',
    type: 'slider',
    field: 'priceArea',
    props: {
      range: true,
      step: 10,
      showStops: true
    }
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
              { type: 'date', required: true, message: '请选择出生日期', trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        },
        formData: { // 表单数据
          sex: '',
          name: '',
          age: '',
          email: '',
          birth: '',
          city: '',
          receive: '',
          fruit: [],
          tech: '',
          pay: '',
          priceArea: [20, 60]
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
