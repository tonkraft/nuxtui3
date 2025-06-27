import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ApplicationHeader from '../../components/ApplicationHeader.vue'

const user = { name: 'Jane Doe', status: 'Online' }

describe('ApplicationHeader', () => {
  it('renders user name', () => {
    const wrapper = mount(ApplicationHeader, {
      props: { user },
      global: {
        stubs: ['UButton', 'UAvatar']
      }
    })
    expect(wrapper.text()).toContain('Jane Doe')
  })
})
