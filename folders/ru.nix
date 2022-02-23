# DO NOT CHANGE THIS FILE

{ pkgs ? import <nixpkgs> { } }:
with pkgs; mkShell {
  name = "node-dev-shell";

  APPEND_LIBRARY_PATH = "${lib.makeLibraryPath [ libGL libuuid ]}";
  shellHook = ''
    export LD_LIBRARY_PATH="$APPEND_LIBRARY_PATH:$LD_LIBRARY_PATH"
		npm i

		npm run-script start
  '';

	# Replace 'npm run-script run' with your run command.

}