import React from "react"
import { mount } from "enzyme"
import DateTimePicker from "../lib"

describe("react-flatpickr", () => {
  it("shows an empty input", () => {
    const component = mount(<DateTimePicker />)
    const input = component.find("input").instance()
    expect(input.value).toBe("")
    component.unmount()
  })

  describe("when a value is provided", () => {
    describe("and it is in the YYYY-MM-DD format", () => {
      it("shows it in the input", () => {
        const component = mount(<DateTimePicker value="2000-01-01" />)
        const input = component.find("input").instance()
        expect(input.value).toBe("2000-01-01")
        component.unmount()
      })
    })

    describe("and it is in the YYYY.MM.DD format", () => {
      it("normalizes it and shows in the input", () => {
        const component = mount(<DateTimePicker value="2000.01.01" />)
        const input = component.find("input").instance()
        expect(input.value).toBe("2000-01-01")
        component.unmount()
      })
    })
  })
})
