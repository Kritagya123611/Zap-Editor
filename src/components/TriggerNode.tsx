import { Handle, Position } from "reactflow"

export default function TriggerNode({ data }: any) {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl shadow-md p-4 w-60">
      <strong className="text-orange-600">⚡ Trigger</strong>
      <p className="text-sm mt-1">{data.label}</p>
      <Handle type="source" position={Position.Bottom} id="a" className="bg-orange-500 w-2.5 h-2.5" />
    </div>
  )
}
