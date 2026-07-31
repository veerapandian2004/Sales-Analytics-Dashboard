import React, { useState } from "react"
import {
  Plus, AlertCircle, CheckCircle2,
  Calendar, Package, Tag, MapPin,
  Hash, DollarSign, User,
} from "lucide-react"
import { useCreateSale } from "../../hooks/useCreateSale"

const CATEGORY_OPTIONS = ["Electronics", "Grocery", "Clothing", "Other"]
const REGION_OPTIONS   = ["North", "South", "East", "West"]

function AddSaleForm({ onSuccess }) {
  const createMutation = useCreateSale()

  const [form, setForm] = useState({
    sales_date: new Date().toISOString().split("T")[0],
    product:    "",
    category:   "Electronics",
    region:     "North",
    quantity:   1,
    amount:     "",
    customer:   "",
  })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setForm({ ...form, [field]: value })
    if (errors[field]) setErrors({ ...errors, [field]: null })
  }

  function validate() {
    const e = {}
    if (!form.sales_date) e.sales_date = "Required"
    if (!form.product?.trim()) e.product = "Required"
    if (!form.amount || Number(form.amount) <= 0) e.amount = "Must be > 0"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    try {
      await createMutation.mutateAsync({
        sales_date: form.sales_date,
        product:    form.product.trim(),
        category:   form.category,
        region:     form.region,
        quantity:   Number(form.quantity),
        amount:     Number(form.amount),
        customer:   form.customer.trim(),
      })
      setForm({
        sales_date: new Date().toISOString().split("T")[0],
        product: "", category: "Electronics", region: "North",
        quantity: 1, amount: "", customer: "",
      })
      if (onSuccess) setTimeout(() => onSuccess(), 800)
    } catch (err) {
      console.error(err)
    }
  }

  const isPending = createMutation.isPending
  const isSuccess = createMutation.isSuccess
  const isError   = createMutation.isError

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Success */}
      {isSuccess && (
        <div className="flex items-center gap-2 bg-emerald-50 border
                        border-emerald-200 text-emerald-700 rounded-xl
                        px-4 py-2.5 text-sm animate-slide-down">
          <CheckCircle2 size={16} />
          <span className="font-medium">Sale created successfully!</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex items-center gap-2 bg-red-50 border
                        border-red-200 text-red-700 rounded-xl
                        px-4 py-2.5 text-sm animate-slide-down">
          <AlertCircle size={16} />
          <span className="font-medium">
            {createMutation.error?.message || "Failed to save"}
          </span>
        </div>
      )}

      {/* Date + Product */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Sales Date" error={errors.sales_date} icon={Calendar} required>
          <input
            type="date"
            value={form.sales_date}
            onChange={(e) => handleChange("sales_date", e.target.value)}
            className="form-input"
          />
        </Field>
        <Field label="Product" error={errors.product} icon={Package} required>
          <input
            type="text"
            value={form.product}
            onChange={(e) => handleChange("product", e.target.value)}
            placeholder="e.g. MacBook Pro"
            className="form-input"
          />
        </Field>
      </div>

      {/* Category + Region */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Category" icon={Tag} required>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="form-input"
          >
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Region" icon={MapPin}>
          <select
            value={form.region}
            onChange={(e) => handleChange("region", e.target.value)}
            className="form-input"
          >
            {REGION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>
      </div>

      {/* Quantity + Amount */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Quantity" icon={Hash}>
          <input
            type="number"
            min="1"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="form-input"
          />
        </Field>
        <Field label="Amount" error={errors.amount} icon={DollarSign} required>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="0.00"
            className="form-input"
          />
        </Field>
      </div>

      {/* Customer */}
      <Field label="Customer Name" icon={User}>
        <input
          type="text"
          value={form.customer}
          onChange={(e) => handleChange("customer", e.target.value)}
          placeholder="Optional"
          className="form-input"
        />
      </Field>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onSuccess}
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold
                     text-gray-600 hover:bg-gray-100 disabled:opacity-50
                     transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="relative flex items-center gap-2 px-6 py-2.5 rounded-xl
                     text-sm font-semibold text-white shadow-lg shadow-indigo-300/50
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                     hover:shadow-xl hover:shadow-indigo-400/60 hover:scale-105
                     disabled:opacity-70 disabled:hover:scale-100
                     transition-all duration-200"
        >
          {isPending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white
                              rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus size={16} />
              Create Sale
            </>
          )}
        </button>
      </div>

      {/* Form input styles */}
      <style>{`
        .form-input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
          background: white;
          border: 1.5px solid #e5e7eb;
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:hover {
          border-color: #c7d2fe;
        }
        .form-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </form>
  )
}

function Field({ label, required, error, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold
                        text-gray-600 uppercase tracking-wider">
        {Icon && <Icon size={11} className="text-indigo-500" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

export default AddSaleForm