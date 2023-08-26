import { writable } from "svelte/store";
import { APIManager } from "/util/api";

export const alert = writable("Welcome to the to-do list app!");
