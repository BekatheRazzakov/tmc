import { createAsyncThunk } from "@reduxjs/toolkit";

export const getGoods = createAsyncThunk("data/getGoods", async (_, {rejectWithValue}) => {
  // try {
  //   const response = await axiosApi.post("/login/", userData);
  //   return response.data;
  // } catch (e) {
  //   if (isAxiosError(e) && e.response && e.response.status === 400) {
  //     return rejectWithValue(e.response.data);
  //   }
  //   throw e;
  // }
  const getData = new Promise((resolve) => {
    setTimeout(() => {
      resolve(goodsList);
    }, 2000);
  });
  return await getData;
});

export const getGood = createAsyncThunk("data/getGood", async (id, {rejectWithValue}) => {
  // try {
  //   const response = await axiosApi.post("/login/", userData);
  //   return response.data;
  // } catch (e) {
  //   if (isAxiosError(e) && e.response && e.response.status === 400) {
  //     return rejectWithValue(e.response.data);
  //   }
  //   throw e;
  // }
  const getData = new Promise((resolve) => {
    setTimeout(() => {
      resolve(goodsList.filter(good => good.id.toString() === id)[0]);
    }, 2000);
  });
  return await getData;
});

const goodsList = [{
  "id": 43214708972134,
  "user_id": 1,
  "manufacture": "Tp-Link",
  "model": "Tp-Link 740n",
  "cost": 1000,
  "barcode": "678461273",
  "good_status_id": 1
}, {
  "id": 43214708972135,
  "user_id": 2,
  "manufacture": "Tp-Link",
  "model": "Tp-Link 740n",
  "cost": 1200,
  "barcode": "678461274",
  "good_status_id": 2
}, {
  "id": 43214708972136,
  "user_id": 3,
  "manufacture": "Netgear",
  "model": "Netgear R6400",
  "cost": 1500,
  "barcode": "678461275",
  "good_status_id": 3
}, {
  "id": 43214708972137,
  "user_id": 4,
  "manufacture": "Asus",
  "model": "RT-AC68U",
  "cost": 2000,
  "barcode": "678461276",
  "good_status_id": 1
}, {
  "id": 43214708972138,
  "user_id": 5,
  "manufacture": "Linksys",
  "model": "Linksys WRT1900AC",
  "cost": 1800,
  "barcode": "678461277",
  "good_status_id": 2
}, {
  "id": 43214708972139,
  "user_id": 6,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer C7",
  "cost": 2500,
  "barcode": "678461278",
  "good_status_id": 3
}, {
  "id": 43214708972140,
  "user_id": 7,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk R7000",
  "cost": 2200,
  "barcode": "678461279",
  "good_status_id": 1
}, {
  "id": 43214708972141,
  "user_id": 8,
  "manufacture": "Asus",
  "model": "RT-AC86U",
  "cost": 2600,
  "barcode": "678461280",
  "good_status_id": 2
}, {
  "id": 43214708972142,
  "user_id": 9,
  "manufacture": "Linksys",
  "model": "Linksys EA7500",
  "cost": 2400,
  "barcode": "678461281",
  "good_status_id": 3
}, {
  "id": 43214708972143,
  "user_id": 1,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR841N",
  "cost": 3000,
  "barcode": "678461282",
  "good_status_id": 1
}, {
  "id": 43214708972144,
  "user_id": 2,
  "manufacture": "Netgear",
  "model": "Netgear R7000P",
  "cost": 3200,
  "barcode": "678461283",
  "good_status_id": 2
}, {
  "id": 43214708972145,
  "user_id": 3,
  "manufacture": "Asus",
  "model": "RT-AX88U",
  "cost": 3500,
  "barcode": "678461284",
  "good_status_id": 3
}, {
  "id": 43214708972146,
  "user_id": 4,
  "manufacture": "Linksys",
  "model": "Linksys WRT3200ACM",
  "cost": 3800,
  "barcode": "678461285",
  "good_status_id": 1
}, {
  "id": 43214708972147,
  "user_id": 5,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer A7",
  "cost": 4000,
  "barcode": "678461286",
  "good_status_id": 2
}, {
  "id": 43214708972148,
  "user_id": 6,
  "manufacture": "Netgear",
  "model": "Netgear XR500",
  "cost": 4200,
  "barcode": "678461287",
  "good_status_id": 3
}, {
  "id": 43214708972149,
  "user_id": 7,
  "manufacture": "Asus",
  "model": "RT-AX58U",
  "cost": 4500,
  "barcode": "678461288",
  "good_status_id": 1
}, {
  "id": 43214708972150,
  "user_id": 8,
  "manufacture": "Linksys",
  "model": "Linksys EA8500",
  "cost": 4800,
  "barcode": "678461289",
  "good_status_id": 2
}, {
  "id": 43214708972151,
  "user_id": 9,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR940N",
  "cost": 5000,
  "barcode": "678461290",
  "good_status_id": 3
}, {
  "id": 43214708972152,
  "user_id": 1,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk AX12",
  "cost": 5500,
  "barcode": "678461291",
  "good_status_id": 1
}, {
  "id": 43214708972153,
  "user_id": 2,
  "manufacture": "Asus",
  "model": "RT-AX92U",
  "cost": 6000,
  "barcode": "678461292",
  "good_status_id": 2
}, {
  "id": 43214708972154,
  "user_id": 3,
  "manufacture": "Linksys",
  "model": "Linksys EA9300",
  "cost": 6200,
  "barcode": "678461293",
  "good_status_id": 3
}, {
  "id": 43214708972155,
  "user_id": 4,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer A9",
  "cost": 6400,
  "barcode": "678461294",
  "good_status_id": 1
}, {
  "id": 43214708972156,
  "user_id": 5,
  "manufacture": "Netgear",
  "model": "Netgear Orbi",
  "cost": 6800,
  "barcode": "678461295",
  "good_status_id": 1
}, {
  "id": 43214708972157,
  "user_id": 6,
  "manufacture": "Asus",
  "model": "RT-AX82U",
  "cost": 7000,
  "barcode": "678461296",
  "good_status_id": 3
}, {
  "id": 43214708972158,
  "user_id": 7,
  "manufacture": "Linksys",
  "model": "Linksys EA9500",
  "cost": 7200,
  "barcode": "678461297",
  "good_status_id": 1
}, {
  "id": 43214708972159,
  "user_id": 8,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Deco M5",
  "cost": 7500,
  "barcode": "678461298",
  "good_status_id": 1
}, {
  "id": 43214708972160,
  "user_id": 9,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk X10",
  "cost": 8000,
  "barcode": "678461299",
  "good_status_id": 3
}, {
  "id": 43214708972161,
  "user_id": 1,
  "manufacture": "Asus",
  "model": "ROG Rapture GT-AX11000",
  "cost": 8500,
  "barcode": "678461300",
  "good_status_id": 1
}, {
  "id": 43214708972162,
  "user_id": 2,
  "manufacture": "Linksys",
  "model": "Linksys Velop",
  "cost": 9000,
  "barcode": "678461301",
  "good_status_id": 3
}, {
  "id": 43214708972163,
  "user_id": 3,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR1043ND",
  "cost": 9500,
  "barcode": "678461302",
  "good_status_id": 3
}, {
  "id": 43214708972164,
  "user_id": 4,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk X6",
  "cost": 10000,
  "barcode": "678461303",
  "good_status_id": 1
}, {
  "id": 43214708972165,
  "user_id": 5,
  "manufacture": "Asus",
  "model": "RT-AC5300",
  "cost": 11000,
  "barcode": "678461304",
  "good_status_id": 1
}, {
  "id": 43214708972166,
  "user_id": 6,
  "manufacture": "Linksys",
  "model": "Linksys EA7300",
  "cost": 12000,
  "barcode": "678461305",
  "good_status_id": 3
}, {
  "id": 43214708972167,
  "user_id": 7,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer AX6000",
  "cost": 13000,
  "barcode": "678461306",
  "good_status_id": 1
}, {
  "id": 43214708972168,
  "user_id": 8,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk Pro Gaming XR700",
  "cost": 14000,
  "barcode": "678461307",
  "good_status_id": 1
}, {
  "id": 43214708972169,
  "user_id": 9,
  "manufacture": "Asus",
  "model": "RT-AX3000",
  "cost": 15000,
  "barcode": "678461308",
  "good_status_id": 3
}, {
  "id": 43214708972170,
  "user_id": 1,
  "manufacture": "Linksys",
  "model": "Linksys WRT32X",
  "cost": 16000,
  "barcode": "678461309",
  "good_status_id": 1
}, {
  "id": 43214708972171,
  "user_id": 2,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer C1200",
  "cost": 17000,
  "barcode": "678461310",
  "good_status_id": 3
}, {
  "id": 43214708972172,
  "user_id": 3,
  "manufacture": "Netgear",
  "model": "Netgear Orbi RBK50",
  "cost": 18000,
  "barcode": "678461311",
  "good_status_id": 3
}, {
  "id": 43214708972173,
  "user_id": 4,
  "manufacture": "Asus",
  "model": "RT-AX88U",
  "cost": 19000,
  "barcode": "678461312",
  "good_status_id": 1
}, {
  "id": 43214708972174,
  "user_id": 5,
  "manufacture": "Linksys",
  "model": "Linksys EA6900",
  "cost": 20000,
  "barcode": "678461313",
  "good_status_id": 1
}, {
  "id": 43214708972175,
  "user_id": 6,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR902AC",
  "cost": 21000,
  "barcode": "678461314",
  "good_status_id": 3
}, {
  "id": 43214708972176,
  "user_id": 7,
  "manufacture": "Netgear",
  "model": "Netgear R6080",
  "cost": 22000,
  "barcode": "678461315",
  "good_status_id": 1
}, {
  "id": 43214708972177,
  "user_id": 8,
  "manufacture": "Asus",
  "model": "RT-AC58U",
  "cost": 23000,
  "barcode": "678461316",
  "good_status_id": 2
}, {
  "id": 43214708972178,
  "user_id": 9,
  "manufacture": "Linksys",
  "model": "Linksys EA8300",
  "cost": 24000,
  "barcode": "678461317",
  "good_status_id": 3
}, {
  "id": 43214708972179,
  "user_id": 1,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer C2300",
  "cost": 25000,
  "barcode": "678461318",
  "good_status_id": 1
}, {
  "id": 43214708972180,
  "user_id": 2,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk AX8",
  "cost": 26000,
  "barcode": "678461319",
  "good_status_id": 1
}, {
  "id": 43214708972181,
  "user_id": 3,
  "manufacture": "Asus",
  "model": "RT-AC88U",
  "cost": 27000,
  "barcode": "678461320",
  "good_status_id": 3
}, {
  "id": 43214708972182,
  "user_id": 4,
  "manufacture": "Linksys",
  "model": "Linksys WRT1900ACS",
  "cost": 28000,
  "barcode": "678461321",
  "good_status_id": 1
}, {
  "id": 43214708972183,
  "user_id": 5,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR841HP",
  "cost": 29000,
  "barcode": "678461322",
  "good_status_id": 1
}, {
  "id": 43214708972184,
  "user_id": 6,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk R8000",
  "cost": 30000,
  "barcode": "678461323",
  "good_status_id": 3
}, {
  "id": 43214708972185,
  "user_id": 7,
  "manufacture": "Asus",
  "model": "RT-AC67P",
  "cost": 31000,
  "barcode": "678461324",
  "good_status_id": 1
}, {
  "id": 43214708972186,
  "user_id": 8,
  "manufacture": "Linksys",
  "model": "Linksys EA7300",
  "cost": 32000,
  "barcode": "678461325",
  "good_status_id": 1
}, {
  "id": 43214708972187,
  "user_id": 9,
  "manufacture": "Tp-Link",
  "model": "Tp-Link Archer C5400",
  "cost": 33000,
  "barcode": "678461326",
  "good_status_id": 3
}, {
  "id": 43214708972188,
  "user_id": 1,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk R7450",
  "cost": 34000,
  "barcode": "678461327",
  "good_status_id": 1
}, {
  "id": 43214708972189,
  "user_id": 2,
  "manufacture": "Asus",
  "model": "RT-AX55",
  "cost": 35000,
  "barcode": "678461328",
  "good_status_id": 1
}, {
  "id": 43214708972190,
  "user_id": 3,
  "manufacture": "Linksys",
  "model": "Linksys EA9400",
  "cost": 36000,
  "barcode": "678461329",
  "good_status_id": 3
}, {
  "id": 43214708972191,
  "user_id": 4,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR902AC",
  "cost": 37000,
  "barcode": "678461330",
  "good_status_id": 1
}, {
  "id": 43214708972192,
  "user_id": 5,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk R6700",
  "cost": 38000,
  "barcode": "678461331",
  "good_status_id": 2
}, {
  "id": 43214708972193,
  "user_id": 6,
  "manufacture": "Asus",
  "model": "RT-ACRH13",
  "cost": 39000,
  "barcode": "678461332",
  "good_status_id": 1
}, {
  "id": 43214708972194,
  "user_id": 7,
  "manufacture": "Linksys",
  "model": "Linksys EA7400",
  "cost": 40000,
  "barcode": "678461333",
  "good_status_id": 1
}, {
  "id": 43214708972195,
  "user_id": 8,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR842N",
  "cost": 41000,
  "barcode": "678461334",
  "good_status_id": 2
}, {
  "id": 43214708972196,
  "user_id": 9,
  "manufacture": "Netgear",
  "model": "Netgear R6080",
  "cost": 42000,
  "barcode": "678461335",
  "good_status_id": 1
}, {
  "id": 43214708972197,
  "user_id": 1,
  "manufacture": "Asus",
  "model": "RT-AX86U",
  "cost": 43000,
  "barcode": "678461336",
  "good_status_id": 1
}, {
  "id": 43214708972198,
  "user_id": 2,
  "manufacture": "Linksys",
  "model": "Linksys EA9500",
  "cost": 44000,
  "barcode": "678461337",
  "good_status_id": 2
}, {
  "id": 43214708972199,
  "user_id": 3,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR840N",
  "cost": 45000,
  "barcode": "678461338",
  "good_status_id": 3
}, {
  "id": 43214708972200,
  "user_id": 4,
  "manufacture": "Netgear",
  "model": "Netgear R6700",
  "cost": 46000,
  "barcode": "678461339",
  "good_status_id": 1
}, {
  "id": 43214708972201,
  "user_id": 5,
  "manufacture": "Asus",
  "model": "Asus RT-ACRH13",
  "cost": 47000,
  "barcode": "678461340",
  "good_status_id": 2
}, {
  "id": 43214708972202,
  "user_id": 6,
  "manufacture": "Linksys",
  "model": "Linksys EA8500",
  "cost": 48000,
  "barcode": "678461341",
  "good_status_id": 1
}, {
  "id": 43214708972203,
  "user_id": 7,
  "manufacture": "Tp-Link",
  "model": "Tp-Link TL-WR841N",
  "cost": 49000,
  "barcode": "678461342",
  "good_status_id": 1
}, {
  "id": 43214708972204,
  "user_id": 8,
  "manufacture": "Netgear",
  "model": "Netgear Nighthawk R7000P",
  "cost": 50000,
  "barcode": "678461343",
  "good_status_id": 1
}];
