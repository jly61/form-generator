const compObj = {
  input: makeInput,
  inputNumber: makeInputNumber,
  select: makeSelect,
  datePicker: makeDatePicker,
  radioGroup: makeRadioGroup,
  checkbox: makeCheckbox,
  checkboxGroup: makeCheckboxGroup,
  cascader: makeCascader,
  col: makeCol,
  formItem: makeFormItem,
  switch: makeSwitch,
  slider: makeSlider

}

/**
 * 生成 el-input
 * @param {function} h: vue 渲染函数
 * @param {object} formData: 表单数据
 * @param {object} obj: 表单项配置
 * @param {object} vm: 组件实例
 * @returns {VNode}
 */
function makeInput (h, formData, obj, vm) {
  const key = obj.field
  return h('el-input', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      },
      ...bindVm(obj.events, vm)
    }
  }, [])
}

function makeInputNumber (h, formData, obj, vm) {
  const key = obj.field
  return h('el-input-number', {
    props: {
      value: formData[key],
      controlsPosition: 'right',
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    },
    style: {
      width: '100%'
    }
  }, [])
}

function makeSelect (h, formData, obj, vm) {
  const key = obj.field
  let components = []
  if (obj.options) {
    components = obj.options.map(item => {
      return h('el-option', {
        props: item
      })
    })
  }
  return h('el-select', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    },
    style: {
      width: '100%'
    }
  }, components)
}

function makeDatePicker (h, formData, obj, vm) {
  const key = obj.field
  return h('el-date-picker', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    },
    style: {
      width: '100%'
    }
  }, [])
}

function makeRadioGroup (h, formData, obj, vm) {
  const key = obj.field

  let components = []
  if (obj.options) {
    components = obj.options.map(item => {
      return h('el-radio', {
        props: item
      }, [item.label])
    })
  }

  return h('el-radio-group', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    }
  }, components)
}

function makeCheckbox (h, formData, obj, vm) {
  const key = obj.field

  return h('el-checkbox', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    }
  }, [obj.text])
}

function makeCheckboxGroup (h, formData, obj, vm) {
  const key = obj.field

  let components = []
  if (obj.options) {
    components = obj.options.map(item => {
      return h('el-checkbox', {
        props: item
      }, [])
    })
  }

  return h('el-checkbox-group', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    }
  }, components)
}

function makeCascader (h, formData, obj, vm) {
  const key = obj.field

  return h('el-cascader', {
    props: {
      value: formData[key],
      ...obj.props,
      options: obj.options
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    },
    style: {
      width: '100%'
    }
  }, [])
}

function makeSwitch (h, formData, obj, vm) {
  const key = obj.field

  return h('el-switch', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    }
  }, [])
}

function makeSlider (h, formData, obj, vm) {
  const key = obj.field

  return h('el-slider', {
    props: {
      value: formData[key],
      ...obj.props
    },
    on: {
      input (val) {
        if (key) {
          formData[key] = val
        }
      }
    }
  }, [])
}

function makeCol (h, obj, component) {
  return h('el-col', {
    props: {
      span: obj.span || 6
    }
  }, [component])
}

function makeFormItem (h, obj, component) {
  return h('el-form-item', {
    props: {
      ...obj,
      prop: obj.field
    }
  }, [component])
}

/**
 * 将表单项事件绑定到 vm
 * @param events: 表单事件列表
 * @param vm: 组件实例
 * @returns {{}}
 */
function bindVm (events = {}, vm) {
  const result = {}

  for (const key in events) {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      result[key] = events[key].bind(vm)
    }
  }

  return result
}

export default compObj
