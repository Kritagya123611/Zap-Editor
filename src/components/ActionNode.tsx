import { Handle, Position } from "reactflow"

export default function ActionNode({ data }: any) {
  return (
    <div className="bg-white text-black border border-gray-300 rounded-xl shadow-md p-4 w-60">
      <strong className="text-blue-600">🔧 Action</strong>
      <p className="text-sm mt-1">{data.label}</p>
      <Handle type="target" position={Position.Top} id="a" className="bg-blue-500 w-2.5 h-2.5" />
      <Handle type="source" position={Position.Bottom} id="b" className="bg-blue-500 w-2.5 h-2.5" />
    </div>
  )
}
