import compObj from './util'

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  render (h) {
    const { formOptions, formData, formItems } = this.options

    const components = formItems.map(item => {
      // 获取生成组件函数
      const func = compObj[item.type]
      // 生成组件
      const subComp = func ? func.call(this, h, formData, item, this) : null
      // 包裹formItem
      const comp = compObj.formItem(h, item, subComp)
      // 返回包裹col的组件
      return compObj.col(h, item, comp)
    })

    return h('el-form', {
      ref: 'lyForm',
      props: {
        model: formData,
        ...formOptions
      }
    }, components)
  },
  methods: {
    getForm () {
      return this.$refs.lyForm
    }
  }
}
