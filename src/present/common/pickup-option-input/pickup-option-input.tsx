import { useEffect, useState } from "react";
import type BaseProps from "../base-props";
import type PickupPoint from "../../../data/models/pickup-point";
import { useAxios } from "../../../domain/hooks/my-axios";

import css from './pickup-option-input.module.css'
import { homePage } from "../../../domain/api-path";
import { DropDownIco, LocationFromIco, LocationToIco } from "../../icons";

export interface OptInputProps extends BaseProps{
    titleStr?: string,
    type: "from" | "to",
    onOptChange: (element?: PickupPoint) => void
}

export const PickupPointSelect: React.FC<OptInputProps> = (props) => {

    const {type = "from", onOptChange} = props

    const [points, setPoints] = useState<PickupPoint[]>([]);
    const [selectedPoint, setSelectedPoint] = useState<PickupPoint | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const axios = useAxios();

    useEffect(() => {
    axios.get<{success: boolean, reason?: string, points: PickupPoint[]}>(homePage.getPickupPoints)
        .then(res => {
        setPoints(res.data.points);
        if (res.data.points.length > 0) {
            setSelectedPoint(res.data.points[0]);
        }
        });
    }, []);

    const handleChange = (point: PickupPoint) => {
        setSelectedPoint(point);
        onOptChange(point);
    }

    return (
    <div style={{ padding: 20, fontSize: 14}}>
        <label style={{ display: "block", marginBottom: 6 }}>{type == "from" ? "Город отправки" : "Город получения"}</label>
        <div style={{ position: "relative", width: 260, marginBottom: 10 }}>
        <div
            onClick={() => setDropdownOpen(open => !open)}
            className={css.inputField}
        >
            <span style={{ marginRight: 8 }}>{type == "from" ? <LocationFromIco color="#CED2DA"/> : <LocationToIco color="#CED2DA"/>}</span>
            <span style={{ flex: 1 }}>{selectedPoint ? selectedPoint.name : "Выберите город"}</span>
            <span style={{
            marginLeft: "auto",
            transform: dropdownOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.1s"
            }}>
            <DropDownIco color="#CED2DA"/>
            </span>
        </div>
        {dropdownOpen && (
            <div className={css.dropdown}>
            {points.map(point => (
                <div
                    key={point.id}
                    onClick={() => {
                        handleChange(point);
                        setDropdownOpen(false);
                    }}
                    className={css.dropdownItem}
                    data-selected={selectedPoint != null && selectedPoint.id === point.id}
                >
                {point.name}
                </div>
            ))}
            </div>
        )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
        {points.slice(0,3).map(point => (
            <span
            key={point.id}
            onClick={() => handleChange(point)}
            style={{
                cursor: "pointer",
                color: "#a9b1ba",
                textDecoration: selectedPoint && selectedPoint.id === point.id ? "underline" : "none"
            }}
            >
            {point.name}
            </span>
        ))}
        </div>
    </div>
    );
};