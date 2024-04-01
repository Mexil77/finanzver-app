"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

interface Category {
	_id: string;
	name: string;
	mandatorySpend: boolean;
	color: string;
	budget: number;
	level: number;
	childs: Category[];
}

export default function Categories({}: Props) {
	const router = useRouter();

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

	const setFetchCategories = (
		currentCategories: Category[],
		newCategories: Category[],
		idParent: string
	): Category[] => {
		return currentCategories.map((category: Category) => {
			if (category.childs) {
				category.childs = setFetchCategories(
					category.childs,
					newCategories,
					idParent
				);
			}
			if (category._id === idParent) {
				category.childs = newCategories;
			}
			return category;
		});
	};

	const handleClickAddCategory = (level: number, idParent: string) => {
		router.push(`/categories/AddCategory?level=${level}&id_parent=${idParent}`);
	};

	const handleClickParent = async (idParent: string) => {
		try {
			const response = await axios.get("/api/categories", {
				params: {
					parent: idParent,
				},
			});
			if (response.data) {
				setCategories(
					setFetchCategories(categoriesArr, response.data, idParent)
				);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const generateCategoriesList = (categories: Category[]) => {
		return (
			<ul className="list-group">
				{categories.map((category: Category) => {
					return (
						<li
							key={category._id}
							className="list-group-item"
							style={{ backgroundColor: category.color }}
							onClick={() => handleClickParent(category._id)}
						>
							<div className="d-flex justify-content-between align-items-center">
								<span className="badge text-bg-primary rounded-25 fs-5 border border-white">
									{category.name}
								</span>
								<span className="badge text-bg-primary rounded-25 fs-5 border border-white">
									${category.budget}
								</span>
								<button
									className="btn btn-info btn-sm border border-white"
									onClick={() =>
										handleClickAddCategory(category.level + 1, category._id)
									}
								>
									+
								</button>
							</div>
							{category.childs && generateCategoriesList(category.childs)}
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className="container">
			<Link href={"/"} style={{ textDecoration: "none" }}>
				<h1>Categorias</h1>
			</Link>
			{generateCategoriesList(categoriesArr)}
		</div>
	);
}
