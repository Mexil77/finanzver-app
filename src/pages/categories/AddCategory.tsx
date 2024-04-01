"use client";

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import { useRouter, useSearchParams } from "next/navigation";

interface FormState {
	name: string;
	color: string;
	mandatorySpend: boolean;
	budget: number;
}

type Props = {};

export default function AddCategorie({}: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [formState, setFormState] = useState<FormState>({
		name: "",
		color: "#563d7c",
		mandatorySpend: false,
		budget: 0,
	});
	const [loading, setLoading] = useState<Boolean>(false);

	async function saveCategorie(request: FormState) {
		const level = searchParams?.get("level");
		const parent = searchParams?.get("id_parent");
		console.log(level);
		console.log(parent);

		setLoading(true);
		await axios.post("/api/categories", { ...request, level, parent });
		setLoading(false);
		router.push("/");
	}

	return (
		<div className="container">
			<h1 className="mb-4">Agrega una nueva categoria</h1>
			{loading ? (
				<div className="row">
					<div className="col d-flex flex-column align-items-center">
						<p className="mb-8">Cargando...</p>
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				</div>
			) : (
				<>
					<div className="input-group mb-3">
						<span className="input-group-text" id="inputGroup-sizing-default">
							Nombre
						</span>
						<input
							type="text"
							className="form-control"
							aria-label="Sizing example input"
							aria-describedby="inputGroup-sizing-default"
							value={formState.name}
							onChange={(e) =>
								setFormState({ ...formState, name: e.target.value })
							}
						/>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text">$</span>
						<input
							type="number"
							className="form-control"
							aria-label="Amount (to the nearest dollar)"
							value={formState.budget}
							onChange={(e) =>
								setFormState({ ...formState, budget: Number(e.target.value) })
							}
						/>
						<span className="input-group-text">.00</span>
					</div>
					<div className="d-flex justify-content-between mb-4">
						<div className="w-50 d-flex flex-column align-items-center">
							<label className="form-label">Color</label>
							<input
								type="color"
								className="form-control form-control-color"
								id="exampleColorInput"
								title="Choose your color"
								value={formState.color}
								onChange={(e) =>
									setFormState({ ...formState, color: e.target.value })
								}
							/>
						</div>
						<div className="w-50 d-flex flex-column align-items-center">
							<label className="form-check-label">Gasto obligatorio</label>
							<input
								className="form-check-input"
								type="checkbox"
								id="flexCheckDefault"
								checked={formState.mandatorySpend}
								onChange={() =>
									setFormState({
										...formState,
										mandatorySpend: !formState.mandatorySpend,
									})
								}
							/>
						</div>
					</div>
					<button
						className="btn btn-primary w-100"
						onClick={() => saveCategorie(formState)}
					>
						Guardar
					</button>
				</>
			)}
		</div>
	);
}
