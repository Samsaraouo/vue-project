import service from "@/services/index.js";

export const weatherApi = () => service(
    {
        url: "https://devapi.qweather.com/v7/weather/now?location=101210107&key=80550d1ef7f340e7abb91aa4977da609",
        method: "get",
    }
)
export const getStatistics = () => service({method: "get", url: "/tst/onemap/getStatistics",})
export const getVolume = () => service({method: "get", url: "/tst/onemap/getVolume",})
export const getTreeHeight = () => service({method: "get", url: "/tst/onemap/getTreeHeight",})
export const getTreeDbh = () => service({method: "get", url: "/tst/onemap/getTreeDbh",})
export const getTreeAge = () => service({method: "get", url: "/tst/onemap/getTreeAge",})
export const getCarbonStocks = () => service({method: "get", url: "/tst/onemap/getCarbonStocks",})
export const getVector = () => service({method: "get", url: "/tst/onemap/getVector",})
export const getTypeTwo = () => service({method: "get", url: "/tst/onemap/getTypeTwo",})
