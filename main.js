
document.addEventListener("DOMContentLoaded", () => {

    // making call to api to get all exchange rates
    fetchCurrency()

    // adding click event listener to fire the conversion function
    const convert_btn = document.getElementsByClassName("btn")
    convert_btn[0].addEventListener("click", (event) => {
        event.preventDefault()
        convertCurrency()
    })

    let clear_res = document.querySelector(".result-icons i:first-child")
    let copy_res = document.querySelector(".result-icons i:last-child")
    let res_area = document.querySelector("textarea")

    // adds clear results functionality
    clear_res.addEventListener("click", () => {
        if (res_area.value !== "Results Here...") {
            res_area.value = "Results Here..."
            res_area.style.color = "var(--place-holder)"
            const msg = document.getElementsByTagName("p")
            msg[0].style.color = "var(--place-holder)"
            msg[0].textContent= "Cleared"
            msg[0].style.visibility = "visible"
            setTimeout(() => {
                msg[0].textContent= "error msg"
                msg[0].style.visibility = "hidden"
            }, 1000)
        }

    })

    // adds copy results functionality
    copy_res.addEventListener("click", () => {
        if (res_area.value !== "Results Here...") {
            res_area.select()
            navigator.clipboard.writeText(res_area.value)
            const msg = document.getElementsByTagName("p")
            msg[0].style.color = "var(--place-holder)"
            msg[0].textContent= "Copied"
            msg[0].style.visibility = "visible"
            setTimeout(() => {
                msg[0].textContent= "error msg"
                msg[0].style.visibility = "hidden"
            }, 1000)
        }

    })

})

const fetchCurrency = async () => {

    // getting data through fetch api
    const response = await fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json")
    const data = await response.json()
    const keys = Object.keys(data)
    
    const from = document.getElementById("from-currency")
    const to = document.getElementById("to-currency")

    // append each currency to the currency menu
    keys.map((key) => {
        let x = document.createElement("option")
        x.textContent = key
        from.appendChild(x)

        let y = document.createElement("option")
        y.textContent = key
        to.appendChild(y)
    })

}

const convertCurrency = async () => {
   
    const amount = document.querySelector("input[type=number]").value

    // in case if the user enters invalid input
    if (amount === "") {
        const msg = document.getElementsByTagName("p")
        msg[0].style.color = "red"
        msg[0].textContent= "Please enter a valid amount..."
        msg[0].style.visibility = "visible"
        setTimeout(() => {
            msg[0].textContent= "error msg"
            msg[0].style.visibility = "hidden"
        }, 1000)
        return
    }

    const from_currency = document.getElementById("from-currency").value
    const to_currency = document.getElementById("to-currency").value

    // getting data according to user specification
    const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from_currency}/${to_currency}.json`)
    const data = await response.json()
    // calulate the result
    const res = amount * data[to_currency]

    // show the result
    const result_holder = document.getElementsByTagName("textarea")
    result_holder[0].value = res
    result_holder[0].style.color = "white"

}