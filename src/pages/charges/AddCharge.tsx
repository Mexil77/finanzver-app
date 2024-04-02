"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Category {
	_id: string;
	name: string;
	mandatorySpend: boolean;
	color: string;
	budget: number;
	level: number;
	childs: Category[];
}

interface FormState {
	category: string;
	name: string;
	amount: number;
}

type Props = {};

export default function AddCharge({}: Props) {
	const router = useRouter();

	const [loading, setLoading] = useState<Boolean>(false);
	const [formState, setFormState] = useState<FormState>({
		category: "",
		name: "",
		amount: 0,
	});
	const [categoriesArr, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("/api/categories", {
					params: {
						parent: "",
					},
				});
				if (response.data) {
					setCategories(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategories();
	}, []);

	async function saveCharge() {
		setLoading(true);
		await axios.post("/api/charges", { ...formState });
		setLoading(false);
		router.push("/");
	}

	return (
		<div className="container">
			<Link href={"/"} style={{ textDecoration: "none" }}>
				<h1 className="mb-4">Agrega una nuevo cargo</h1>
			</Link>
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
						<span className="input-group-text" id="inputGroup-sizing-default">
							Categoria
						</span>
						<select
							className="form-select"
							aria-label="Default select example"
							value={formState.category}
							onChange={(e) => {
								setFormState({ ...formState, category: e.target.value });
							}}
						>
							{categoriesArr.map((category: Category) => (
								<option
									key={category._id}
									value={category._id}
									style={{ backgroundColor: category.color }}
								>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className="input-group mb-3">
						<span className="input-group-text">$</span>
						<input
							type="number"
							className="form-control"
							aria-label="Amount (to the nearest dollar)"
							value={formState.amount}
							onChange={(e) =>
								setFormState({ ...formState, amount: Number(e.target.value) })
							}
						/>
						<span className="input-group-text">.00</span>
					</div>
					<button className="btn btn-primary w-100" onClick={saveCharge}>
						Guardar
					</button>
				</>
			)}
		</div>
	);
}
