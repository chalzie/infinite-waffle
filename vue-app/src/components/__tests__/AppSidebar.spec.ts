import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import AppSidebar from '@/components/AppSidebar.vue'

describe('app-sidebar', () => {
  it('renders properly', () => {
    const wrapper = mount(AppSidebar)
    expect(wrapper.html()).toContain('app-sidebar')
  })
})
