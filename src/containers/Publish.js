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
    const [preview, setPreview] = useState();
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
        <div className="publish">
            <h2>Vends ton article</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">
                        {preview ? (
                            <div className="div-onClick">
                                <img src={preview} alt="" />
                                <span
                                    onClick={() => {
                                        setPreview();
                                    }}
                                >
                                    X
                                </span>
                            </div>
                        ) : (
                            <div className="div-span">
                                <span>Ajouter une photo</span>
                            </div>
                        )}
                    </label>
                    <input
                        accept="image/*"
                        id="file"
                        type="file"
                        className="file-form"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            try {
                                setPreview(
                                    URL.createObjectURL(e.target.files[0])
                                );
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    />
                </div>
                <div>
                    <div>
                        <span>Titre</span>
                        <input
                            placeholder="ex: Chemise Sézane verte"
                            type="text"
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Description</span>
                        <input
                            placeholder="ex: porté quelque fois, taille correctement"
                            type="text"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <span>Marque</span>
                        <input
                            placeholder="ex: Zara"
                            type="text"
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Taille</span>
                        <input
                            placeholder="ex: L/40/12"
                            type="text"
                            onChange={(e) => {
                                setSize(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Couleur</span>
                        <input
                            placeholder="ex: Bleu canard"
                            type="text"
                            onChange={(e) => {
                                setColor(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>État</span>
                        <input
                            placeholder="ex: Neuf avec étiquette"
                            type="text"
                            onChange={(e) => {
                                setCondition(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <span>Lieu</span>
                        <input
                            placeholder="ex: Paris"
                            type="text"
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <span>Prix</span>
                        <input
                            placeholder="ex: 40"
                            type="text"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="button-publish">
                    <button type="submit">Publier</button>
                </div>
            </form>
        </div>
    );
};

export default Publish;
