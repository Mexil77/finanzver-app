"use client";
import { useRouter } from "next/navigation";

type Props = {};

export default function UserHome({}: Props) {
	const router = useRouter();
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
					<button type="button" className="btn btn-primary">
						Configuracion
					</button>
				</div>
			</div>
			<ul className="list-group">
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary">
					Saldo en cuenta
					<span className="badge text-bg-primary rounded-pill">$1000</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
					Disponible para gastar
					<span className="badge text-bg-success rounded-pill">$1000</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-warning">
					Saldo anterior
					<span className="badge text-bg-warning rounded-pill">$1000</span>
				</li>
				<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-info">
					Ahorrado
					<span className="badge text-bg-info rounded-pill">$1000</span>
				</li>
			</ul>
			<button className="btn btn-warning mt-4 w-100">Agregar Gasto</button>
			<div className="row row-cols-1 g-4 mt-1">
				<div className="col">
					<div className="card">
						<div className="card-header">Comida</div>
						<div className="card-body">
							<div className="card-text">$10</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card">
						<div className="card-header">Comida</div>
						<div className="card-body">
							<div className="card-text">$10</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card">
						<div className="card-header">Comida</div>
						<div className="card-body">
							<div className="card-text">$10</div>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card">
						<div className="card-header">Comida</div>
						<div className="card-body">
							<div className="card-text">$10</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
