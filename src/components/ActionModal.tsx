"use client"

import { useState, useRef, useEffect } from "react"
import {
  Mail,
  FileText,
  Send,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Github,
  CreditCard,
  Wallet,
  Webhook,
  Coins,
  TrendingUp,
  BarChart3,
} from "lucide-react"

const actionEventsByApp: Record<string, Array<{ value: string; label: string; icon: any }>> = {
  gmail: [
    { value: "send-email", label: "Send Email", icon: Send },
    { value: "reply-email", label: "Reply to Email", icon: Mail },
    { value: "forward-email", label: "Forward Email", icon: ArrowRight },
    { value: "add-label", label: "Add Label to Email", icon: FileText },
    { value: "mark-read", label: "Mark as Read", icon: Mail },
  ],
  github: [
    { value: "create-issue", label: "Create Issue", icon: Github },
    { value: "create-pr", label: "Create Pull Request", icon: Github },
    { value: "add-comment", label: "Add Comment", icon: FileText },
    { value: "close-issue", label: "Close Issue", icon: Github },
    { value: "merge-pr", label: "Merge Pull Request", icon: Github },
  ],
  discord: [
    { value: "send-message", label: "Send Message", icon: Send },
    { value: "send-dm", label: "Send Direct Message", icon: MessageSquare },
    { value: "add-reaction", label: "Add Reaction", icon: MessageSquare },
    { value: "create-channel", label: "Create Channel", icon: MessageSquare },
  ],
  telegram: [
    { value: "send-message", label: "Send Message", icon: Send },
    { value: "send-photo", label: "Send Photo", icon: Send },
    { value: "send-document", label: "Send Document", icon: FileText },
    { value: "reply-message", label: "Reply to Message", icon: Send },
  ],
  notion: [
    { value: "create-page", label: "Create Page", icon: FileText },
    { value: "update-page", label: "Update Page", icon: FileText },
    { value: "add-database-item", label: "Add Database Item", icon: FileText },
    { value: "share-page", label: "Share Page", icon: ArrowRight },
  ],
  stripe: [
    { value: "create-customer", label: "Create Customer", icon: CreditCard },
    { value: "create-subscription", label: "Create Subscription", icon: CreditCard },
    { value: "process-refund", label: "Process Refund", icon: CreditCard },
    { value: "send-invoice", label: "Send Invoice", icon: Send },
  ],
  paypal: [
    { value: "send-payment", label: "Send Payment", icon: Wallet },
    { value: "request-payment", label: "Request Payment", icon: Wallet },
    { value: "create-invoice", label: "Create Invoice", icon: FileText },
  ],
  forms: [
    { value: "create-form", label: "Create Form", icon: FileText },
    { value: "add-response", label: "Add Response", icon: FileText },
    { value: "export-responses", label: "Export Responses", icon: ArrowRight },
  ],
  webhook: [
    { value: "trigger-webhook", label: "Trigger Webhook", icon: Webhook },
    { value: "send-data", label: "Send Data", icon: Send },
    { value: "post-request", label: "Make POST Request", icon: ArrowRight },
  ],
  icp: [
    { value: "send-tokens", label: "Send Tokens", icon: Send },
    { value: "create-transaction", label: "Create Transaction", icon: Coins },
    { value: "update-balance", label: "Update Balance", icon: Coins },
  ],
  wallet: [
    { value: "send-alert", label: "Send Balance Alert", icon: Send },
    { value: "log-transaction", label: "Log Transaction", icon: FileText },
    { value: "update-tracking", label: "Update Tracking", icon: TrendingUp },
  ],
  portfolio: [
    { value: "rebalance", label: "Rebalance Portfolio", icon: BarChart3 },
    { value: "send-report", label: "Send Performance Report", icon: Send },
    { value: "log-change", label: "Log Value Change", icon: FileText },
    { value: "set-alert", label: "Set Price Alert", icon: TrendingUp },
  ],
}

function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  options: Array<{
    value: string
    label: string
    icon: any
  }>
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 py-2 bg-[#2a2e3f] border border-[#3a3f52] rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#6d3be4] focus:border-[#6d3be4] flex items-center justify-between hover:border-[#4a4f62] text-white"
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <>
              <selectedOption.icon className="h-4 w-4 text-[#9b9bab]" />
              <span className="text-white">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-[#9b9bab]">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 text-[#9b9bab] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#2a2e3f] border border-[#3a3f52] rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left hover:bg-[#3a3f52] focus:bg-[#3a3f52] flex items-center gap-2 text-white"
            >
              <option.icon className="h-4 w-4 text-[#9b9bab]" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ActionDropdown({
  isOpen,
  onSave,
  onCancel,
  appType,
}: {
  isOpen: boolean
  onSave: (formData: { event: string }) => void
  onCancel: () => void
  appType?: string
}) {
  const [selectedAction, setSelectedAction] = useState("")
  const actionOptions = appType ? actionEventsByApp[appType] || [] : []

  const handleSave = () => {
    if (selectedAction) {
      onSave({ event: selectedAction })
      setSelectedAction("")
    }
  }

  const handleCancel = () => {
    setSelectedAction("")
    onCancel()
  }

  const selectedOption = actionOptions.find((option) => option.value === selectedAction)

  if (!isOpen) return null

  return (
    <div className="mt-3 p-4 bg-[#1b1f2a] border border-[#3a3f52] rounded-lg space-y-4">
      <div>
        <h3 className="text-sm font-medium text-white mb-2">Configure Action</h3>
        <p className="text-xs text-[#9b9bab] mb-3">Choose what action to perform with {appType}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[#c5c5d2]">Select Action</label>
          <span className="bg-red-500/20 text-red-400 text-xs px-1.5 py-0.5 rounded-full">*</span>
        </div>

        {actionOptions.length > 0 ? (
          <CustomSelect
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Choose an action"
          />
        ) : (
          <div className="text-sm text-[#9b9bab] p-3 bg-[#2a2e3f] rounded-lg">No actions available for this app</div>
        )}
      </div>

      {selectedOption && (
        <div className="bg-[#2a2e3f] rounded-lg p-3 space-y-2">
          <h4 className="text-sm font-medium text-[#9b9bab]">Preview</h4>
          <div className="flex items-center gap-2 text-sm text-[#c5c5d2]">
            <selectedOption.icon className="h-4 w-4" />
            <span>Action: {selectedOption.label}</span>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 text-sm font-medium text-[#9b9bab] bg-[#2a2e3f] border border-[#3a3f52] rounded-md hover:bg-[#3a3f52]"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!selectedAction}
          className="px-3 py-1.5 text-sm font-medium text-white bg-[#6d3be4] border border-transparent rounded-md hover:bg-[#5a2fc7] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Action
        </button>
      </div>
    </div>
  )
}
