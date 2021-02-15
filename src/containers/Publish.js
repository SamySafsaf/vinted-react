import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publish = ({ setUser, userToken }) => {
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState();
    const [color, setColor] = useState("");
    const [file, setFile] = useState();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.append("picture", file);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                    headers: {
                        authorization: `Bearer ${userToken}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            history.push(`/offer/${response.data._id}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>Vends ton article</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                <span>Titre</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <span>Description</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <span>marque</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setBrand(e.target.value);
                    }}
                />
                <span>Taille</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setSize(e.target.value);
                    }}
                />
                <span>Couleur</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setColor(e.target.value);
                    }}
                />
                <span>État</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setCondition(e.target.value);
                    }}
                />
                <span>Lieu</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                />
                <span>Prix</span>
                <input
                    type="text"
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <button type="submit">Publier</button>
            </form>
        </div>
    );
};

export default Publish;
