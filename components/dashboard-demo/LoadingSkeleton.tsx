const LoadingSkeleton = () => {
  return (
    <tr className="flex flex-1 justify-between items-center gap-1 border-b py-3 animate-pulse">
      <td className="flex flex-1 min-w-[140px] md:max-w-[190px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="bg-stone-200 rounded-full w-6 md:w-10 aspect-square" />
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
      <td className="flex min-w-[142px] sm:min-w-[154px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-6 bg-stone-200 rounded-full" />
      </td>
      <td className="hidden lg:flex min-w-[162px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
      <td className="hidden sm:flex w-[100px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
      <td className="hidden xl:flex flex-1 max-w-[270px] flex-wrap items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-6 bg-stone-200 rounded-full" />
        <div className="flex-1 h-6 bg-stone-200 rounded-full" />
      </td>
      <td className="hidden sm:flex flex-1 max-w-[60px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="bg-stone-200 rounded-full w-6 aspect-square" />
      </td>
      <td className="hidden lg:flex flex-1 max-w-[112px] items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
      <td className="hidden xl:flex flex-1 items-center gap-3 px-4 text-sm text-stone-500">
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
      <td className="flex w-24 justify-center items-center gap-4 px-4 text-stone-500">
        <div className="flex-1 h-3 bg-stone-200 rounded" />
      </td>
    </tr>
  );
};

export default LoadingSkeleton;
