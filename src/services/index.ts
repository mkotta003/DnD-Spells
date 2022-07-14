import axios from "axios";

export const fetch = async () => {
    let data = await axios.get("https://www.dnd5eapi.co/api/spells", {
        headers: {
            "Content-Type": "application/json",
        },
    });
    let getFavourites: any = await fetchFavourites();
    data.data.results.forEach((element: any) => {
        element.isFavourite = false;
        getFavourites.forEach((fav: any) => {
            if (element.index == fav.index) {
                element.isFavourite = true;
            }
        });
    });
    return data.data.results;
};

export const fetchSpellDetails = async (data: any) => {
    let spellData = await axios.get("https://www.dnd5eapi.co" + data.url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return spellData.data;
};

export const addToFavourite = async (data: any) => {
    let getFavourites: any = await fetchFavourites();
    getFavourites.push(data);
    localStorage.setItem("favourites", JSON.stringify(getFavourites));
    return data;
};

export const removeFavourite = async (data: any) => {
    let getFavourites: any = await fetchFavourites();
    getFavourites = getFavourites.filter((x:any) => x.index != data.index);
    localStorage.setItem("favourites", JSON.stringify(getFavourites));
    return data;
};

export const fetchFavourites = async () => {
    let getFavourites: any = localStorage.getItem("favourites");
    getFavourites = JSON.parse(getFavourites);
    return getFavourites;
};
