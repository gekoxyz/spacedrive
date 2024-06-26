import { useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useOperatingSystem } from '~/hooks';
import { OperatingSystem } from '~/util/Platform';

export const explorerOperatingSystemStore = proxy({
	os: undefined as Extract<OperatingSystem, 'windows' | 'macOS'> | undefined
});

// This hook is used to determine the operating system behavior of the explorer.
export const useExplorerOperatingSystem = () => {
	const operatingSystem = useOperatingSystem(true);
	const store = useSnapshot(explorerOperatingSystemStore);

	useEffect(() => {
		if (store.os) return;
		explorerOperatingSystemStore.os = operatingSystem === 'windows' ? 'windows' : 'macOS';
	}, [operatingSystem, store.os]);

	const explorerOperatingSystem =
		store.os ?? (operatingSystem === 'windows' ? 'windows' : 'macOS');

	return {
		operatingSystem,
		explorerOperatingSystem,
		matchingOperatingSystem: operatingSystem === explorerOperatingSystem
	};
};
