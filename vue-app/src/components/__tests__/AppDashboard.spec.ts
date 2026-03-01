import { mount } from '@vue/test-utils'

import { describe, expect, it } from 'vitest'
import AppDashboard from '@/components/AppDashboard.vue'

describe('app-dashboard', () => {
  it('renders properly', () => {
    const wrapper = mount(AppDashboard)
    expect(wrapper.html()).toContain('app-dashboard')
  })
})
