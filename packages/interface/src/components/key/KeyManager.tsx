import { Eye, EyeSlash, Gear, Lock } from 'phosphor-react';
import { useState } from 'react';
import { useLibraryMutation, useLibraryQuery } from '@sd/client';
import { Button, ButtonLink, Input, Tabs } from '@sd/ui';
import { showAlertDialog } from '~/util/dialog';
import { DefaultProps } from '../primitive/types';
import { KeyList } from './KeyList';
import { KeyMounter } from './KeyMounter';

export type KeyManagerProps = DefaultProps;

export function KeyManager(props: KeyManagerProps) {
	const isUnlocked = useLibraryQuery(['keys.isUnlocked']);
	const keyringSk = useLibraryQuery(['keys.getSecretKey'], { initialData: '' });
	const isKeyManagerUnlocking = useLibraryQuery(['keys.isKeyManagerUnlocking']);
	const unlockKeyManager = useLibraryMutation('keys.unlockKeyManager', {
		onError: () => {
			showAlertDialog({
				title: 'Unlock Error',
				value: 'The information provided to the key manager was incorrect'
			});
		}
	});
	const unmountAll = useLibraryMutation('keys.unmountAll');
	const clearMasterPassword = useLibraryMutation('keys.clearMasterPassword');

	const [showMasterPassword, setShowMasterPassword] = useState(false);
	const [showSecretKey, setShowSecretKey] = useState(false);

	const [masterPassword, setMasterPassword] = useState('');
	const [secretKey, setSecretKey] = useState('');

	const [enterSkManually, setEnterSkManually] = useState(keyringSk?.data === null);

	if (!isUnlocked?.data) {
		const MPCurrentEyeIcon = showMasterPassword ? EyeSlash : Eye;
		const SKCurrentEyeIcon = showSecretKey ? EyeSlash : Eye;

		return (
			<div className="p-2">
				<div className="relative flex flex-grow mb-2">
					<Input
						value={masterPassword}
						onChange={(e) => setMasterPassword(e.target.value)}
						autoFocus
						type={showMasterPassword ? 'text' : 'password'}
						className="flex-grow !py-0.5"
						placeholder="Master Password"
					/>
					<Button
						onClick={() => setShowMasterPassword(!showMasterPassword)}
						size="icon"
						className="border-none absolute right-[5px] top-[5px]"
					>
						<MPCurrentEyeIcon className="w-4 h-4" />
					</Button>
				</div>

				{enterSkManually && (
					<div className="relative flex flex-grow mb-2">
						<Input
							value={secretKey}
							onChange={(e) => setSecretKey(e.target.value)}
							type={showSecretKey ? 'text' : 'password'}
							className="flex-grow !py-0.5"
							placeholder="Secret Key"
						/>
						<Button
							onClick={() => setShowSecretKey(!showSecretKey)}
							size="icon"
							className="border-none absolute right-[5px] top-[5px]"
						>
							<SKCurrentEyeIcon className="w-4 h-4" />
						</Button>
					</div>
				)}
				<Button
					className="w-full"
					variant="accent"
					disabled={
						unlockKeyManager.isLoading || isKeyManagerUnlocking.data !== null
							? isKeyManagerUnlocking.data!
							: false
					}
					onClick={() => {
						if (masterPassword !== '') {
							setMasterPassword('');
							setSecretKey('');
							unlockKeyManager.mutate({ password: masterPassword, secret_key: secretKey });
						}
					}}
				>
					Unlock
				</Button>
				{!enterSkManually && (
					<div className="relative flex flex-grow">
						<p
							className="text-accent mt-2"
							onClick={(e) => {
								setEnterSkManually(true);
							}}
						>
							or enter secret key manually
						</p>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div>
				<Tabs.Root defaultValue="mount">
					<div className="flex flex-col">
						<Tabs.List>
							<Tabs.Trigger className="text-sm font-medium" value="mount">
								Mount
							</Tabs.Trigger>
							<Tabs.Trigger className="text-sm font-medium" value="keys">
								Keys
							</Tabs.Trigger>
							<div className="flex-grow" />
							<Button
								size="icon"
								onClick={() => {
									unmountAll.mutate(null);
									clearMasterPassword.mutate(null);
								}}
								variant="outline"
								className="text-ink-faint"
							>
								<Lock className="w-4 h-4 text-ink-faint" />
							</Button>
							<ButtonLink
								to="/settings/keys"
								size="icon"
								variant="outline"
								className="text-ink-faint"
							>
								<Gear className="w-4 h-4 text-ink-faint" />
							</ButtonLink>
						</Tabs.List>
					</div>
					<Tabs.Content value="keys">
						<KeyList />
					</Tabs.Content>
					<Tabs.Content value="mount">
						<KeyMounter />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		);
	}
}
