import Categories from "./Categories";

const year = 2023;
const Data2023 = [
  {
    id: "23",
    title: "A Time Called You",
    category: [Categories.Kdrama, Categories.Rec],
    img: "https://i.mydramalist.com/BdpgYz_4c.jpg",
  },
  {
    id: "22",
    title: "Beckham",
    category: [Categories.TvShow],
    img: "https://m.media-amazon.com/images/M/MV5BM2Q0Y2Q1ZmUtN2RhMy00M2MwLWJiOWQtYzU1N2Q1ZjFlZGNjXkEyXkFqcGdeQXVyMjQ2MTk1OTE@._V1_.jpg",
  },
  {
    id: "21",
    title: "My Lovely Liar",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/3/3c/My_Lovely_Liar-p2.jpg",
  },
  {
    id: "20",
    title: "SPY×FAMILY",
    category: [Categories.Anime],
    img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTDB3SXq2GWbTtSIS9H6bmJl8q-pMJmGvVaU8Okq655lOs5co3y",
  },
  {
    id: "19",
    title: "The summer I turned pretty",
    category: [Categories.TvShow],
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT8X55N1NXsQbDDtnTE83FOV-JXlUe_cbA3gYj7KLl85ZC7w1Tz",
  },
  {
    id: "18",
    title: "Celebrity",
    category: [Categories.Kdrama, Categories.Rec],
    img: "https://i.mydramalist.com/pdK07b_4c.jpg",
  },
  {
    id: "17",
    title: "Mask Girl",
    category: [Categories.Kdrama, Categories.Rec],
    img: "https://i.mydramalist.com/kAozJr_4c.jpg",
  },
  {
    id: "16",
    title: "King the Land",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/7/7f/King_the_Land-p1.jpg",
  },
  {
    id: "15",
    title: "Beef",
    category: [Categories.TvShow],
    img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTPun_5G7AFJS38W9_7OFbfhoKJDUpzKJ__5T1lP2VLq3cEtwpp",
  },
  {
    id: "14",
    title: "My Roommate is a gumiho",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/a/ad/My_Roommate_Is_A_Gumiho-MP001.jpeg",
  },
  {
    id: "13",
    title: "The Glory",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/e/e5/The_Glory-p2.jpg",
  },
  {
    id: "12",
    title: "Crash Course in Romance",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/9/91/Crash_Course_in_Romance-tp03.jpeg",
  },
  {
    id: "11",
    title: "Love to Hate you",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/f/f3/Love_to_Hate_You-p1.jpg",
  },
  {
    id: "10",
    title: "Cyberpunk: Edgerunners",
    category: [Categories.TvShow],
    img: "https://upload.wikimedia.org/wikipedia/en/a/a1/Cyberpunk_Edgerunners_poster.jpg",
  },
  {
    id: "9",
    title: "The interest of love",
    category: [Categories.Kdrama],
    img: "https://i.mydramalist.com/kg4Ob_4c.jpg",
  },
  {
    id: "8",
    title: "Physical 100",
    category: [Categories.Kdrama, Categories.TvShow],
    img: "https://upload.wikimedia.org/wikipedia/en/9/9a/Physical_100_%28promotional_poster%29.jpeg",
  },
  {
    id: "7",
    title: "Bling Empire NY",
    category: [Categories.TvShow],
    img: "https://occ-0-2567-2568.1.nflxso.net/dnm/api/v6/WNk1mr9x_Cd_2itp6pUM7-lXMJg/AAAABZtZ9bRhGOOPXlY-mVGNGH3jYtXoww3SixocihlEzEF07WySHKoeHW50VEvXsqjHegsSeCHcJ7v6WxN-r1Kxmh2FACbkeOVHU03f622V8mACKxSKMW8CLNEOBzRCSiH5eT7wiA.jpg",
  },
  {
    id: "6",
    title: "Alchemy of souls s2",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/2/2b/Alchemy_of_Souls_2-mp1.jpeg",
  },
  {
    id: "5",
    title: "Alice in Borderland s2",
    category: [Categories.TvShow],
    img: "https://asianwiki.com/images/e/e3/Alice_in_Borderland-S2-tp01.jpeg",
  },
  {
    id: "4",
    title: "The Fabulous",
    category: [Categories.Kdrama],
    img: "https://asianwiki.com/images/a/a1/The_Fabulous_Netflix-p3.jpg",
  },
  {
    id: "3",
    title: "Singles inferno s2",
    category: [Categories.Kdrama, Categories.TvShow],
    img: "https://0.soompi.io/wp-content/uploads/2022/11/15140705/Singles-Inferno-2.jpg",
  },
  {
    id: "2",
    title: "Ginny & Georgia s2",
    category: [Categories.TvShow],
    img: "https://resizing.flixster.com/vEmnVnshGX-TAL8MzqQSb44YIQg=/206x305/v2/https://resizing.flixster.com/aAIwzNm8B1ymNnaUcvAVxfjc8qw=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNDhjM2ZlZjMtYTA2Zi00MmM1LWFjNWEtMTVhMzQxNGJkZTdhLmpwZw==",
  },
  {
    id: "1",
    title: "Emily in paris s3",
    category: [Categories.TvShow],
    img: "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQbkPLnDBkPwoKTOiNwZV5FCtBSzNvZsPB4BRz3MiueSDd0BBfLvX6vIfJepRtmpSq0BmzlQRVsL8S7hbE7y2XaBdin8mw7sOKdT0Xe0PWVIJmXAyB00OwZ3TH07yzpKGNBDhQv2VbAB1NdqkWOMHgvKO.jpg?r=67c",
  },
];

export default Data2023;
// export { year, Data2023 };
