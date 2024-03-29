import React, { useState } from "react";
import axios from "axios";
import styles from "../../app/page.module.css";

interface FormState {
	name: string;
	color: string;
	mandatorySpend: boolean;
	budget: number;
}

async function saveCategorie(request: FormState) {
	await axios.post("/api/categories", request);
}

type Props = {};

export default function AddCategorie({}: Props) {
	const [formState, setFormState] = useState<FormState>({
		name: "",
		color: "",
		mandatorySpend: false,
		budget: 0,
	});

	return (
		<div className={styles.main}>
			<label>Nombre</label>
			<input
				type="text"
				placeholder="Casa"
				value={formState.name}
				onChange={(e) => setFormState({ ...formState, name: e.target.value })}
			/>
			<label>Color</label>
			<input
				type="text"
				placeholder="#84ac21"
				value={formState.color}
				onChange={(e) => setFormState({ ...formState, color: e.target.value })}
			/>
			<label>Gasto obligatorio</label>
			<input
				type="checkbox"
				checked={formState.mandatorySpend}
				onChange={() =>
					setFormState({
						...formState,
						mandatorySpend: !formState.mandatorySpend,
					})
				}
			/>
			<label>Presupuesto</label>
			<input
				type="number"
				placeholder="1000"
				value={formState.budget}
				onChange={(e) =>
					setFormState({ ...formState, budget: Number(e.target.value) })
				}
			/>
			<button onClick={() => saveCategorie(formState)}>Guardar</button>
		</div>
	);
}
