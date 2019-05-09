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

  describe("#value", () => {
    describe("is in the YYYY-MM-DD format", () => {
      it("shows it in the input", () => {
        const component = mount(<DateTimePicker value="2000-01-01" />)
        const input = component.find("input").instance()
        expect(input.value).toBe("2000-01-01")
        component.unmount()
      })
    })

    describe("is in the YYYY.MM.DD format", () => {
      it("normalizes it and shows in the input", () => {
        const component = mount(<DateTimePicker value="2000.01.01" />)
        const input = component.find("input").instance()
        expect(input.value).toBe("2000-01-01")
        component.unmount()
      })
    })
  })

  describe("#render", () => {
    it("is possible to provide a custom input", () => {
      function MaskedInput ({ defaultValue, innerRef }) {
        return (<input defaultValue={defaultValue} ref={innerRef} />)
      }
      const component = mount(
        <DateTimePicker
          defaultValue="2000-01-01"
          render={
            ({ defaultValue }, ref) => {
              return (
                <div>
                  <MaskedInput defaultValue={defaultValue} innerRef={ref} />
                  <span>bar</span>
                </div>
              )
            }
          }
        />
      )
      const input = component.find("input").instance()
      const span = component.find("span")
      expect(input.value).toEqual("2000-01-01")
      expect(span).toBeDefined()
      component.unmount()
    })
  })

  describe("#onCreate", () => {
    it("is called when the flatpickr instance is created", () => {
      let spy = jest.fn()
      const component = mount(<DateTimePicker onCreate={spy} />)
      expect(spy).toHaveBeenCalled()
      component.unmount()
    })

    it("is possible to reference the flatpickr instance", () => {
      let calendar
      const component = mount(
        <DateTimePicker
          defaultValue="2000-01-01"
          onCreate={(flatpickr) => { calendar = flatpickr }}
          render={
            ({ defaultValue }, ref) => {
              return (
                <div>
                  <input defaultValue={defaultValue} ref={ref} />
                  <button onClick={() => {
                    calendar.setDate("1000-01-01")
                  }}>
                    foo
                  </button>
                </div>
              )
            }
          }
        />
      )
      const input = component.find("input").instance()
      expect(input.value).toEqual("2000-01-01")
      const button = component.find("button")
      button.simulate("click")
      expect(input.value).toEqual("1000-01-01")
      component.unmount()
    })
  })

  describe("#onDestroy", () => {
    it("is called when the flatpickr instance is destroyed", () => {
      let spy = jest.fn()
      const component = mount(<DateTimePicker onDestroy={spy} />)
      component.unmount()
      expect(spy).toHaveBeenCalled()
    })
  })
})
