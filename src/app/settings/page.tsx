'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { NavigationBar } from '@/components/navigation-bar';
import { Select } from '@/components/ui/select';
import {
  setCaptureMode,
  setCaptureWithProvider,
  setRuntimeMode,
} from '@/lib/redux/slices/jobSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { CommonValue } from '@/lib/values/common.value';

export default function Settings() {
  const dispatch = useAppDispatch();
  const jobState = useAppSelector((state) => state.job);

  // Filter job data to get image provider keys
  const imageProviderKeys = useMemo(() => {
    if (!jobState.job?.data) return [];

    return Object.keys(jobState.job.data).filter((key) => key.startsWith('IMAGE_PROVIDER'));
  }, [jobState.job]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col pb-16 p-4 overflow-auto">
        {/* Image Provider Block */}
        <div className="mb-6 border border-border rounded-sm p-4">
          <h2 className="text-lg font-medium mb-2">Image Providers</h2>
          <div className="grid grid-cols-2 gap-4">
            {imageProviderKeys.length > 0 ? (
              imageProviderKeys.map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <div className="text-xs mb-1 text-center">{key}</div>
                  {/* Thêm 'relative' vào phần tử cha của Image */}
                  <div className="border border-border rounded-sm w-full aspect-square flex items-center justify-center overflow-hidden relative">
                    {jobState.job?.data[key] ? (
                      <Image
                        src={CommonValue.getCurrentJobImage(jobState.job.data[key])}
                        alt={key}
                        fill={true} // Sử dụng thuộc tính fill
                        // Sử dụng object-cover để ảnh lấp đầy và có thể bị cắt
                        // Hoặc object-contain nếu bạn muốn ảnh vừa vặn và giữ tỉ lệ, có thể có khoảng trống
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">No image</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-muted-foreground">
                No image providers found
              </div>
            )}
          </div>
        </div>

        {/* Configuration Options */}
        <div className="mb-6 border border-border rounded-sm p-4">
          <h2 className="text-lg font-medium mb-4">Configuration</h2>

          {/* Capture Mode */}
          <div className="mb-4">
            <Select
              label="Capture Mode"
              value={jobState.captureMode}
              onChange={(e) => dispatch(setCaptureMode(e.target.value as 'specific' | 'all'))}
              className="w-full"
            >
              <option value="specific">Specific</option>
              <option value="all">All</option>
            </Select>
          </div>

          {/* Capture With Provider */}
          <div className="mb-4">
            <Select
              label="Capture With Provider"
              value={jobState.captureWithProvider || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? null : (e.target.value as 'DirectX');
                dispatch(setCaptureWithProvider(value));
              }}
              className="w-full"
            >
              <option value="">None</option>
              <option value="DirectX">DirectX</option>
            </Select>
          </div>

          {/* Runtime Mode */}
          <div className="mb-4">
            <Select
              label="Runtime Mode"
              value={jobState.runtimeMode}
              onChange={(e) => dispatch(setRuntimeMode(e.target.value as 'CLI' | 'SERVICE'))}
              className="w-full"
            >
              <option value="CLI">CLI</option>
              <option value="SERVICE">SERVICE</option>
            </Select>
          </div>
        </div>

        {/* Job State Block */}
        <div className="mb-6 border border-border rounded-sm p-4">
          <h2 className="text-lg font-medium mb-2">Job State</h2>
          <pre className="text-xs overflow-auto bg-secondary/20 p-2 rounded-sm">
            {JSON.stringify(jobState, null, 2)}
          </pre>
        </div>
      </div>

      {/* Navigation bar */}
      <NavigationBar />
    </div>
  );
}
