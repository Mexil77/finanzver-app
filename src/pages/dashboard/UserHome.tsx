"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";

type Props = {};

interface Charge {
	_id: string;
	category: string;
	name: string;
	amount: number;
	active: true;
	createdAt: Date;
}

interface PrincipalValues {
	total: number;
	totalToSpend: number;
	totalBefore: number;
	totalSave: number;
}

export default function UserHome({}: Props) {
	const router = useRouter();

	const [charges, setCharges] = useState<Charge[]>([]);
	const [principalValues, setPrincipalValues] = useState<PrincipalValues>({
		total: 2500,
		totalToSpend: 0,
		totalBefore: 800,
		totalSave: 0,
	});

	useEffect(() => {
		const fetchCharges = async () => {
			try {
				const response = await axios.get("/api/charges");
				if (response.data) {
					setCharges(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		const fetchTotalSpend = async () => {
			try {
				const response = await axios.get("/api/charges/totalSpend");
				if (response.data) {
					setPrincipalValues({
						...principalValues,
						total: principalValues.total - response.data[0].totalSpend,
					});
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchCharges();
		fetchTotalSpend();
	}, []);
	return (
		<div className="container">
			<div className="d-flex justify-content-between">
				<h1>Tu Balance</h1>
				<div className="btn-group" role="group" aria-label="Basic example">
					<button
						type="button"
						className="btn btn-primary"
						onClick={() =>
							router.push("/categories/AddCategory?level=0&id_parent=")
						}
					>
						Categorias
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => router.push("/categories/Categories")}
					>
						Estadisticas
					</button>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => console.log(charges)}
					>
						Configuracion
					</button>
				</div>
			</div>
			<ul className="list-group">
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">
					Saldo en cuenta
					<span className="badge text-bg-primary rounded-pill">
						${principalValues.total}
					</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
					Disponible para gastar
					<span className="badge text-bg-success rounded-pill">
						${principalValues.totalToSpend}
					</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-warning">
					Saldo anterior
					<span className="badge text-bg-warning rounded-pill">
						${principalValues.totalBefore}
					</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
					Ahorrado
					<span className="badge text-bg-info rounded-pill">
						${principalValues.totalSave}
					</span>
				</li>
			</ul>
			<button
				className="btn btn-warning mt-4 w-100"
				onClick={() => router.push("/charges/AddCharge")}
			>
				Agregar Gasto
			</button>
			<div className="row row-cols-1 g-4 mt-1">
				{charges?.map((charge: Charge) => {
					return (
						<div key={charge._id} className="col">
							<div className="card">
								<div className="card-header">{charge.name}</div>
								<div className="card-body">
									<div className="card-text">${charge.amount}</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
