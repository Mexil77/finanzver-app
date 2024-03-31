"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";

type Props = {};

interface Category {
	_id: string;
	name: string;
	mandatorySpend: boolean;
	color: string;
	budget: number;
	level: number;
}

export default function Categories({}: Props) {
	const [categoriesArr, setCategories] = useState<any>([]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await axios.get("/api/categories");
				if (response.data) {
					setCategories(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategories();
	}, []);

	return (
		<div className="container">
			<h1>Categorias</h1>
			<ul className="list-group">
				{categoriesArr?.map((category: Category) => (
					<li
						key={category._id}
						className="list-group-item d-flex justify-content-between align-items-center"
						style={{ backgroundColor: category.color }}
					>
						{category.name}
						<span className="badge text-bg-primary rounded-pill">
							${category.budget}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
